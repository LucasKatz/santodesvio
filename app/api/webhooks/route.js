import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateTicketCode, generateQRCode } from '@/app/services/ticketService';

export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// A. Función para enviar correo de ENTRADAS FESTIVAL (con QR)
async function sendTicketEmail({ email, name, lastName, ticketCode, qrDataUrl, dni, phone, amount }) {
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');
  const qrBuffer = Buffer.from(base64Data, 'base64');

  const mailOptions = {
    from: `"Santo Desvío Festival" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🎟️ Entrada Santo Desvío - Ticket #${ticketCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 25px; border-radius: 8px; max-width: 500px; margin: 0 auto; border: 1px solid #F2A21B;">
        <h1 style="color: #F2A21B; text-align: center; margin-bottom: 5px;">¡Hola ${name} ${lastName}!</h1>
        <p style="text-align: center; color: #ccc;">Tu entrada ha sido confirmada. Presenta este código QR en el acceso al evento:</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <img src="cid:qrcodeimg" alt="Código QR Ticket" style="width: 220px; height: 220px; border: 3px solid #F2A21B; background-color: #fff; padding: 5px;" />
        </div>
        
        <div style="background-color: #1a1a1a; padding: 15px; border-radius: 6px; font-size: 14px;">
          <p style="margin: 4px 0;"><strong>Código de Ticket:</strong> <span style="color: #F2A21B;">${ticketCode}</span></p>
          <p style="margin: 4px 0;"><strong>DNI:</strong> ${dni}</p>
          <p style="margin: 4px 0;"><strong>Teléfono:</strong> ${phone}</p>
          <p style="margin: 4px 0;"><strong>Monto Pagado:</strong> $${Number(amount).toLocaleString('es-AR')} ARS</p>
        </div>

        <p style="text-align: center; margin-top: 20px; color: #F2A21B; font-weight: bold;">¡Nos vemos en el festival!</p>
      </div>
    `,
    attachments: [
      {
        filename: `ticket-${ticketCode}.png`,
        content: qrBuffer,
        cid: 'qrcodeimg',
      },
    ],
  };

  return await transporter.sendMail(mailOptions);
}

// B. Función para enviar correo de PRODUCTOS DE TIENDA (Solo Texto/Desglose)
async function sendProductsEmail({ email, name, lastName, dni, phone, items, amount, paymentId }) {
  let itemsFormattedText = '';
  if (items && items.length > 0) {
    itemsFormattedText = items
      .map(item => `• ${item.title || item.name || 'Producto'} x${item.quantity || 1} — $${(item.unit_price || item.price || 0).toLocaleString('es-AR')} ARS`)
      .join('\n');
  } else {
    itemsFormattedText = '• Detalle no especificado / Compra general';
  }

  const emailContent = `
============================================
🍺 NUEVO PEDIDO CONFIRMADO - SANTO DESVÍO
============================================

DATOS DEL CLIENTE:
--------------------------------------------
• Nombre completo: ${name} ${lastName}
• DNI: ${dni}
• Teléfono: ${phone}
• Email: ${email}

DETALLE DEL PEDIDO:
--------------------------------------------
${itemsFormattedText}

RESUMEN DE PAGO:
--------------------------------------------
• ID Transacción MP: ${paymentId}
• Total Abonado: $${Number(amount).toLocaleString('es-AR')} ARS
• Estado: APROBADO

============================================
Santo Desvío - Tienda Oficial
  `;

  const mailOptions = {
    from: `"Santo Desvío Tienda" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `📋 Pedido Confirmado #${paymentId} - ${name} ${lastName}`,
    text: emailContent,
    html: `<pre style="font-family: monospace; background-color: #121212; color: #F2A21B; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.5;">${emailContent}</pre>`,
  };

  return await transporter.sendMail(mailOptions);
}

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    let topic = searchParams.get('topic') || searchParams.get('type');
    let id = searchParams.get('id') || searchParams.get('data.id');

    if (!id || !topic) {
      try {
        const body = await req.json();
        topic = topic || body.type || (body.action?.includes('payment') ? 'payment' : null);
        id = id || body.data?.id || body.id;
      } catch (e) {}
    }

    if (topic === 'payment' && id) {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN?.trim()}`,
        },
      });

      const payment = await response.json();

      if (response.ok && payment.status === 'approved') {
        const orderType = payment.metadata?.order_type || 'products';
        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Cliente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const phone = payment.metadata?.phone || 'Sin especificar';
        const amount = payment.transaction_amount || 0;
        const items = payment.metadata?.cart_items || payment.additional_info?.items || [];

        const ADMIN_EMAIL = 'santodesvio@gmail.com';

        /*if (orderType === 'ticket') {
          // --- PROCESAR COMPRA DE ENTRADA ---
          const ticketCode = generateTicketCode();
          const qrContent = 
            `--- SANTO DESVÍO FESTIVAL ---\n` +
            `Código Ticket: ${ticketCode}\n` +
            `Titular: ${name} ${lastName}\n` +
            `DNI: ${dni}\n` +
            `Teléfono: ${phone}\n` +
            `Email: ${email}\n` +
            `Monto Pagado: $${amount} ARS\n` +
            `ID Transacción MP: ${id}`;

          const qrBase64 = await generateQRCode(qrContent);*/

          // 1. Enviar al comprador
          if (email) {
            await sendTicketEmail({ email, name, lastName, ticketCode, qrDataUrl: qrBase64, dni, phone, amount });
          }

          // 2. Copia a Administración (solo si es un correo diferente)
          if (email !== ADMIN_EMAIL) {
            await sendTicketEmail({ email: ADMIN_EMAIL, name: `${name} (Copia Admin)`, lastName, ticketCode, qrDataUrl: qrBase64, dni, phone, amount });
          }

        } else {
          // --- PROCESAR COMPRA DE PRODUCTOS DE TIENDA ---
          // 1. Enviar al comprador
          if (email) {
            await sendProductsEmail({ email, name, lastName, dni, phone, items, amount, paymentId: id });
          }

          // 2. Copia a Administración (solo si es un correo diferente)
          if (email !== ADMIN_EMAIL) {
            await sendProductsEmail({ email: ADMIN_EMAIL, name: `${name} (Copia Admin)`, lastName, dni, phone, items, amount, paymentId: id });
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK MP] Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Webhook Activo' }, { status: 200 });
}