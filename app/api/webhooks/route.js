import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateQRCode } from '@/app/services/ticketService'; // Asegúrate de que este path sea correcto

export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// A. EMAIL PARA EL CLIENTE (Con Imagen QR adjunta)
async function sendCustomerEmailWithQR({ email, name, lastName, qrDataUrl, paymentId, amount }) {
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');
  const qrBuffer = Buffer.from(base64Data, 'base64');

  const mailOptions = {
    from: `"Santo Desvío" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🎟️ Tu Comprobante Santo Desvío #${paymentId}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 25px; border-radius: 8px; max-width: 500px; margin: 0 auto; border: 2px solid #F2A21B;">
        <h1 style="color: #F2A21B; text-align: center; margin-bottom: 5px;">¡Gracias ${name} ${lastName}!</h1>
        <p style="text-align: center; color: #ccc;">Tu compra ha sido confirmada. Muestra este código QR al ingresar:</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <img src="cid:qrcodeimg" alt="Código QR Pedido" style="width: 220px; height: 220px; border: 3px solid #F2A21B; background-color: #fff; padding: 5px;" />
        </div>
        
        <div style="background-color: #1a1a1a; padding: 15px; border-radius: 6px; font-size: 14px; text-align: center;">
          <p style="margin: 4px 0;"><strong>N° Transacción:</strong> <span style="color: #F2A21B;">#${paymentId}</span></p>
          <p style="margin: 4px 0;"><strong>Monto Abonado:</strong> $${Number(amount).toLocaleString('es-AR')} ARS</p>
        </div>

        <p style="text-align: center; margin-top: 20px; color: #F2A21B; font-weight: bold;">¡Nos vemos en Santo Desvío!</p>
      </div>
    `,
    attachments: [
      {
        filename: `comprobante-${paymentId}.png`,
        content: qrBuffer,
        cid: 'qrcodeimg',
      },
    ],
  };

  return await transporter.sendMail(mailOptions);
}

// B. EMAIL PARA EL ADMINISTRADOR (Texto detallado como está ahora)
async function sendAdminEmail({ adminEmail, name, lastName, dni, phone, email, items, amount, paymentId }) {
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
• Email del cliente: ${email}

DETALLE DEL PEDIDO:
--------------------------------------------
${itemsFormattedText}

RESUMEN DE PAGO:
--------------------------------------------
• ID Transacción MP: ${paymentId}
• Total Abonado: $${Number(amount).toLocaleString('es-AR')} ARS
• Estado: APROBADO

============================================
Santo Desvío - Sistema de Notificaciones
  `;

  const mailOptions = {
    from: `"Notificaciones Santo Desvío" <${process.env.GMAIL_USER}>`,
    to: adminEmail,
    subject: `📋 NUEVA VENTA #${paymentId} - ${name} ${lastName}`,
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
        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Cliente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const phone = payment.metadata?.phone || 'Sin especificar';
        const amount = payment.transaction_amount || 0;
        const items = payment.metadata?.cart_items || payment.additional_info?.items || [];

        const ADMIN_EMAIL = 'santodesvio@gmail.com';

        // 1. Armar el texto del desglose para la lectura del QR
        let itemsSummary = items
          .map(i => `${i.quantity || 1}x ${i.title || i.name}`)
          .join(', ');

        const qrTextPayload = 
          `--- SANTO DESVÍO ---\n` +
          `Pedido MP: #${id}\n` +
          `Cliente: ${name} ${lastName}\n` +
          `DNI: ${dni}\n` +
          `Detalle: ${itemsSummary}\n` +
          `Total: $${amount} ARS`;

        // Generar la imagen QR en Base64 con la información embebida
        const qrBase64 = await generateQRCode(qrTextPayload);

        // 2. ENVIAR AL CLIENTE (con el QR)
        if (email) {
          await sendCustomerEmailWithQR({
            email,
            name,
            lastName,
            qrDataUrl: qrBase64,
            paymentId: id,
            amount
          });
        }

        // 3. ENVIAR AL ADMIN (con la planilla completa en texto)
        await sendAdminEmail({
          adminEmail: ADMIN_EMAIL,
          name,
          lastName,
          dni,
          phone,
          email,
          items,
          amount,
          paymentId: id
        });
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