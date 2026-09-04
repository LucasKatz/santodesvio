import { NextResponse } from 'next/server';
import { generateTicketCode, generateQRCode } from '@/app/services/ticketService';
import { sendTicketEmail } from './resend';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Obtener datos de la URL o del Body JSON si MP los manda en el cuerpo
    let topic = searchParams.get('topic') || searchParams.get('type');
    let id = searchParams.get('id') || searchParams.get('data.id');

    // Si no vinieron en la URL, intentar leer el Body enviado por MercadoPago
    if (!id || !topic) {
      try {
        const body = await req.json();
        topic = topic || body.type || (body.action?.includes('payment') ? 'payment' : null);
        id = id || body.data?.id || body.id;
      } catch (e) {
        // El body puede venir vacío en pingeos de prueba de MP
      }
    }

    console.log(`[WEBHOOK] Notificación recibida -> Topic: ${topic} | ID: ${id}`);

    if (topic === 'payment' && id) {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN?.trim()}`,
        },
      });

      const payment = await response.json();
      console.log(`[WEBHOOK] Estado del pago ID ${id}: ${payment.status}`);

      if (payment.status === 'approved') {
        const ticketCode = generateTicketCode();

        // Extracción de datos del comprador
        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Asistente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const phone = payment.metadata?.phone || 'Sin especificar';
        const amount = payment.transaction_amount || 0;

        // Construcción del contenido del QR
        const qrContent = 
          `--- SANTO DESVÍO FESTIVAL ---\n` +
          `Código Ticket: ${ticketCode}\n` +
          `Titular: ${name} ${lastName}\n` +
          `DNI: ${dni}\n` +
          `Teléfono: ${phone}\n` +
          `Email: ${email}\n` +
          `Monto Pagado: $${amount} ARS\n` +
          `ID de Transacción MP: ${id}`;

        const qrBase64 = await generateQRCode(qrContent);

        console.log(`[WEBHOOK] Pago Aprobado. Procesando envío de mails para: ${email} y santodesvio@gmail.com`);

        // 1. Envío de ticket al Comprador
        if (email) {
          await sendTicketEmail({
            email,
            name,
            lastName,
            ticketCode,
            qrDataUrl: qrBase64,
          });
        } else {
          console.warn('[WEBHOOK] ⚠️ No se encontró email del comprador para enviar el ticket.');
        }

        // 2. Envío de copia del ticket a la administración del negocio
        await sendTicketEmail({
          email: 'santodesvio@gmail.com',
          name: `${name} (Copia Venta)`,
          lastName,
          ticketCode,
          qrDataUrl: qrBase64,
        });
      }
    }

    // Responder HTTP 200 a MercadoPago rápido para confirmar la recepción
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK] ❌ Error procesando el webhook:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}