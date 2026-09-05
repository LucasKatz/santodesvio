import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendOrderEmail({ email, name, lastName, dni, phone, items, amount, paymentId }) {
  // 1. Armar la lista de productos en Texto Plano formateado
  let itemsFormattedText = '';
  if (items && items.length > 0) {
    itemsFormattedText = items
      .map(item => `• ${item.title || item.name || 'Producto'} x${item.quantity || 1} — $${(item.unit_price || item.price || 0).toLocaleString('es-AR')} ARS`)
      .join('\n');
  } else {
    itemsFormattedText = '• Detalle no especificado / Compra general';
  }

  // 2. Plantilla en formato "Consulta / Notificación de pedido" sin imágenes ni QR
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
Santo Desvío - Sistema Automatizado de Ventas
  `;

  const mailOptions = {
    from: `"Santo Desvío" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `📋 Confirmación de Pedido - ${name} ${lastName} (MP #${paymentId})`,
    text: emailContent, // Texto plano legible tipo consulta
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

        // Recuperar los items (priorizando metadata.cart_items que guardamos en checkout)
        const items = payment.metadata?.cart_items || payment.additional_info?.items || [];

        // 1. Enviar al comprador
        if (email) {
          await sendOrderEmail({
            email,
            name,
            lastName,
            dni,
            phone,
            items,
            amount,
            paymentId: id,
          });
        }

        // 2. Enviar copia a la administración
        await sendOrderEmail({
          email: 'santodesvio@gmail.com',
          name: `${name} (Copia Venta)`,
          lastName,
          dni,
          phone,
          items,
          amount,
          paymentId: id,
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