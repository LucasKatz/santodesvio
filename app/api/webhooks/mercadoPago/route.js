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
        // El body puede venir vacío si es un pingeo de prueba de MP
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
        
        // TODO: (Recomendado) Verificar si este ID de pago ya fue procesado en tu DB
        // const existingTicket = await db.collection('tickets').findOne({ paymentId: id });
        // if (existingTicket) return NextResponse.json({ received: true }, { status: 200 });

        const ticketCode = generateTicketCode();

        // Extracción de datos del comprador
        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Asistente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const amount = payment.transaction_amount || 0;

        // Construcción del contenido del QR
        const qrContent = 
          `--- SANTO DESVÍO FESTIVAL ---\n` +
          `Código Ticket: ${ticketCode}\n` +
          `Titular: ${name} ${lastName}\n` +
          `DNI: ${dni}\n` +
          `Email: ${email}\n` +
          `Monto Pagado: $${amount} ARS\n` +
          `ID de Transacción MP: ${id}`;

        const qrBase64 = await generateQRCode(qrContent);

        console.log(`[WEBHOOK] Pago Aprobado. Procesando ticket para: ${email} (Código: ${ticketCode})`);

        if (email) {
          await sendTicketEmail({
            email,
            name,
            lastName,
            ticketCode,
            qrDataUrl: qrBase64,
          });

          // TODO: Guardar el ticket generado en MongoDB para validarlo luego en la entrada del festival
        } else {
          console.warn('[WEBHOOK] ⚠️ No se encontró ningún email en metadata ni en payer.');
        }
      }
    }

    // SIEMPRE responder HTTP 200 a MercadoPago rápido para que no reintente la notificación
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK] ❌ Error procesando el webhook:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}