import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateTicketCode } from '@/app/services/ticketService';

export const dynamic = 'force-dynamic';

// Configuración del transporte de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Función para enviar correos con el detalle en texto plano y HTML estilizado
async function sendTicketEmail({ email, name, lastName, ticketCode, items, amount, dni, phone }) {
  // Construcción del desglose de productos en filas HTML
  const itemsListHtml = items && items.length > 0 
    ? items.map(item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #2a2a2a;">${item.title || 'Producto'}</td>
          <td style="padding: 10px; border-bottom: 1px solid #2a2a2a; text-align: center; color: #F2A21B;">x${item.quantity || 1}</td>
          <td style="padding: 10px; border-bottom: 1px solid #2a2a2a; text-align: right;">$${(item.unit_price || 0).toLocaleString('es-AR')} ARS</td>
        </tr>
      `).join('')
    : `<tr><td colspan="3" style="padding: 10px; text-align: center;">Sin especificación de ítems</td></tr>`;

  const mailOptions = {
    from: `"Santo Desvío" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🍺 Detalle de tu compra - Santo Desvío #${ticketCode}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #121212; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
        
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #F2A21B; margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">¡Gracias por tu compra, ${name}!</h1>
          <p style="color: #aaaaaa; margin: 0; font-size: 14px;">Tu pago ha sido procesado exitosamente.</p>
        </div>

        <div style="background-color: #1a1a1a; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #F2A21B; margin-bottom: 25px;">
          <p style="margin: 5px 0; font-size: 14px; color: #dddddd;"><strong>Código de Operación:</strong> <span style="color: #F2A21B; font-weight: bold;">${ticketCode}</span></p>
          <p style="margin: 5px 0; font-size: 14px; color: #dddddd;"><strong>Titular:</strong> ${name} ${lastName}</p>
          <p style="margin: 5px 0; font-size: 14px; color: #dddddd;"><strong>DNI:</strong> ${dni}</p>
          <p style="margin: 5px 0; font-size: 14px; color: #dddddd;"><strong>Teléfono:</strong> ${phone}</p>
        </div>

        <h3 style="color: #F2A21B; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 8px;">
          📦 Detalle del Pedido
        </h3>

        <table style="width: 100%; color: #ffffff; border-collapse: collapse; text-align: left; margin-bottom: 20px; font-size: 14px;">
          <thead>
            <tr style="border-bottom: 2px solid #F2A21B; color: #F2A21B;">
              <th style="padding: 10px; font-weight: bold;">Producto</th>
              <th style="padding: 10px; text-align: center; font-weight: bold;">Cant.</th>
              <th style="padding: 10px; text-align: right; font-weight: bold;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${itemsListHtml}
          </tbody>
        </table>

        <div style="background-color: #1a1a1a; padding: 15px; border-radius: 8px; text-align: right; margin-bottom: 25px;">
          <span style="font-size: 16px; color: #ffffff; font-weight: bold; margin-right: 15px;">TOTAL PAGADO:</span>
          <span style="font-size: 20px; color: #F2A21B; font-weight: bold;">$${Number(amount).toLocaleString('es-AR')} ARS</span>
        </div>

        <div style="text-align: center; border-top: 1px solid #222; padding-top: 20px; font-size: 12px; color: #777777;">
          <p style="margin: 0;">Conserva este correo como comprobante de tu pedido.</p>
          <p style="margin: 5px 0 0 0;">¡Nos vemos en Santo Desvío!</p>
        </div>

      </div>
    `,
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
        console.log('[WEBHOOK MP] 📦 Datos leídos desde el BODY:', body);
      } catch (e) {
        console.log('[WEBHOOK MP] ⚠️ No se pudo parsear el body JSON');
      }
    }

    console.log(`[WEBHOOK MP] 🔍 Topic: "${topic}" | Payment ID: "${id}"`);

    if (topic === 'payment' && id) {
      console.log(`[WEBHOOK MP] 📡 Consultando pago ${id} a Mercado Pago...`);

      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN?.trim()}`,
        },
      });

      const payment = await response.json();

      if (!response.ok) {
        console.error('[WEBHOOK MP] ❌ Error al obtener el pago:', payment);
        return NextResponse.json({ error: 'Error consultando MP' }, { status: 500 });
      }

      console.log(`[WEBHOOK MP] 💳 Estado devuelto: "${payment.status}"`);

      if (payment.status === 'approved') {
        const ticketCode = generateTicketCode();

        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Cliente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const phone = payment.metadata?.phone || 'Sin especificar';
        const amount = payment.transaction_amount || 0;

        // Lista detallada de productos comprados desde Mercado Pago
        const purchasedItems = payment.additional_info?.items || [];

        console.log('[WEBHOOK MP] 📋 Datos del comprador y detalle extraídos:');
        console.log(`   - Nombre: ${name} ${lastName}`);
        console.log(`   - Cantidad de items: ${purchasedItems.length}`);

        // 1. Enviar correo al comprador
        if (email) {
          console.log(`[WEBHOOK MP] ✉️ Enviando email con detalle al comprador (${email})...`);
          const resClient = await sendTicketEmail({
            email,
            name,
            lastName,
            ticketCode,
            items: purchasedItems,
            amount,
            dni,
            phone,
          });
          console.log('[WEBHOOK MP] ✅ Email comprador enviado:', resClient.messageId);
        }

        // 2. Enviar copia a la administración
        console.log('[WEBHOOK MP] ✉️ Enviando copia a santodesvio@gmail.com...');
        const resAdmin = await sendTicketEmail({
          email: 'santodesvio@gmail.com',
          name: `${name} (Copia Venta)`,
          lastName,
          ticketCode,
          items: purchasedItems,
          amount,
          dni,
          phone,
        });
        console.log('[WEBHOOK MP] ✅ Email admin enviado:', resAdmin.messageId);

      } else {
        console.log(`[WEBHOOK MP] ℹ️ El pago ${id} no fue aprobado (Estado: ${payment.status}).`);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK MP] 💥 ERROR EN WEBHOOK:', error);
    return NextResponse.json({ error: 'Webhook Internal Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Endpoint de Webhook activo' }, { status: 200 });
}