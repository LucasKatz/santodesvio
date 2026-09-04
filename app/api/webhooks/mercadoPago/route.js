import { NextResponse } from 'next/server';
import { generateTicketCode, generateQRCode } from '@/app/services/ticketService';
import { sendTicketEmail } from './resend';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  console.log('--------------------------------------------------');
  console.log('[WEBHOOK MP] 🚀 Petición entrante recibida');

  try {
    const { searchParams } = new URL(req.url);

    // 1. Obtener parámetros de la query o del body
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

        // Extracción de metadata y payer
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

        // Generar QR
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

        // 1. Enviar email al cliente
        if (email) {
          console.log(`[WEBHOOK MP] ✉️ Enviando email al comprador (${email})...`);
          const resClient = await sendTicketEmail({
            email,
            name,
            lastName,
            ticketCode,
            qrDataUrl: qrBase64,
          });
          console.log('[WEBHOOK MP] ✅ Email comprador procesado:', resClient);
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
        console.log('[WEBHOOK MP] ✅ Email admin procesado:', resAdmin);

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