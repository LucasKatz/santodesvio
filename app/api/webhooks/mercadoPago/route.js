import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateTicketCode, generateQRCode } from '@/app/services/ticketService';

export const dynamic = 'force-dynamic';

// Configuración del transporte de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Función interna para enviar correos usando Nodemailer
async function sendTicketEmail({ email, name, lastName, ticketCode, qrDataUrl }) {
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');
  const qrBuffer = Buffer.from(base64Data, 'base64');

  const mailOptions = {
    from: `"Santo Desvío Festival" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🎟️ Entrada Santo Desvío - Ticket #${ticketCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 20px; border-radius: 8px;">
        <h1 style="color: #F2A21B;">¡Hola ${name} ${lastName}!</h1>
        <p>Tu pago ha sido aprobado. Presenta este código QR en la entrada del evento:</p>
        <div style="text-align: center; margin: 20px 0;">
          <img src="cid:qrcodeimg" alt="Código QR Ticket" style="width: 200px; height: 200px; border: 2px solid #F2A21B;" />
        </div>
        <p><strong>Código de Ticket:</strong> <span style="color: #F2A21B;">${ticketCode}</span></p>
        <p>¡Nos vemos en el festival!</p>
      </div>
    `,
    attachments: [
      {
        filename: `ticket-${ticketCode}.png`,
        content: qrBuffer,
        cid: 'qrcodeimg', // Muestra la imagen incrustada en el HTML
      },
    ],
  };

  return await transporter.sendMail(mailOptions);
}

export async function POST(req) {
  console.log('--------------------------------------------------');
  console.log('[WEBHOOK MP] 🚀 Petición entrante recibida');

  try {
    const { searchParams } = new URL(req.url);

    let topic = searchParams.get('topic') || searchParams.get('type');
    let id = searchParams.get('id') || searchParams.get('data.id');

    if (!id || !topic) {
      try {
        const body = await req.json();
        topic = topic || body.type || (body.action?.includes('payment') ? 'payment' : null);
        id = id || body.data?.id || body.id;
        console.log('[WEBHOOK MP] 📦 Datos leídos desde el BODY del request:', body);
      } catch (e) {
        console.log('[WEBHOOK MP] ⚠️ No se pudo parsear el body JSON (posible pingeo de prueba)');
      }
    }

    console.log(`[WEBHOOK MP] 🔍 Topic: "${topic}" | Payment ID: "${id}"`);

    if (topic === 'payment' && id) {
      console.log(`[WEBHOOK MP] 📡 Consultando estado del pago ${id} a Mercado Pago...`);

      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN?.trim()}`,
        },
      });

      const payment = await response.json();

      if (!response.ok) {
        console.error('[WEBHOOK MP] ❌ Error al obtener el pago de Mercado Pago:', payment);
        return NextResponse.json({ error: 'Error consultando MP' }, { status: 500 });
      }

      console.log(`[WEBHOOK MP] 💳 Estado devuelto por Mercado Pago: "${payment.status}"`);

      if (payment.status === 'approved') {
        const ticketCode = generateTicketCode();

        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Asistente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const phone = payment.metadata?.phone || 'Sin especificar';
        const amount = payment.transaction_amount || 0;

        console.log('[WEBHOOK MP] 📋 Datos del comprador extraídos:');
        console.log(`   - Nombre: ${name} ${lastName}`);
        console.log(`   - Email: ${email}`);
        console.log(`   - DNI: ${dni}`);
        console.log(`   - Teléfono: ${phone}`);
        console.log(`   - Monto: $${amount}`);

        const qrContent = 
          `--- SANTO DESVÍO FESTIVAL ---\n` +
          `Código Ticket: ${ticketCode}\n` +
          `Titular: ${name} ${lastName}\n` +
          `DNI: ${dni}\n` +
          `Teléfono: ${phone}\n` +
          `Email: ${email}\n` +
          `Monto Pagado: $${amount} ARS\n` +
          `ID Transacción MP: ${id}`;

        console.log('[WEBHOOK MP] ⚙️ Generando código QR...');
        const qrBase64 = await generateQRCode(qrContent);

        // 1. Enviar email al cliente desde Gmail
        if (email) {
          console.log(`[WEBHOOK MP] ✉️ Enviando email vía Gmail al comprador (${email})...`);
          const resClient = await sendTicketEmail({
            email,
            name,
            lastName,
            ticketCode,
            qrDataUrl: qrBase64,
          });
          console.log('[WEBHOOK MP] ✅ Email comprador enviado:', resClient.messageId);
        } else {
          console.warn('[WEBHOOK MP] ⚠️ No hay email de comprador asociado. Se omite este envío.');
        }

        // 2. Enviar copia a la administración
        console.log('[WEBHOOK MP] ✉️ Enviando copia a santodesvio@gmail.com...');
        const resAdmin = await sendTicketEmail({
          email: 'santodesvio@gmail.com',
          name: `${name} (Copia Venta)`,
          lastName,
          ticketCode,
          qrDataUrl: qrBase64,
        });
        console.log('[WEBHOOK MP] ✅ Email admin enviado:', resAdmin.messageId);

      } else {
        console.log(`[WEBHOOK MP] ℹ️ El pago ${id} no fue aprobado (Estado: ${payment.status}). No se envían tickets.`);
      }
    } else {
      console.log('[WEBHOOK MP] ℹ️ La notificación no corresponde a un evento de pago procesable.');
    }

    console.log('[WEBHOOK MP] 🏁 Proceso finalizado con éxito. Devolviendo HTTP 200 a MP');
    console.log('--------------------------------------------------');
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK MP] 💥 ERROR EXCEPCIONAL EN WEBHOOK:', error);
    console.log('--------------------------------------------------');
    return NextResponse.json({ error: 'Webhook Internal Error' }, { status: 500 });
  }
}