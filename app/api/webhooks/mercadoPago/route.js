import { NextResponse } from 'next/server';
import { generateTicketCode, generateQRCode } from '@/app/services/ticketService';
import { sendTicketEmail } from './resend';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get('topic') || searchParams.get('type');
    const id = searchParams.get('id') || searchParams.get('data.id');

    console.log(`[WEBHOOK] Notificación recibida -> Topic: ${topic} | ID: ${id}`);

    if (topic === 'payment' && id) {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      const payment = await response.json();
      console.log(`[WEBHOOK] Estado del pago ID ${id}: ${payment.status}`);

      if (payment.status === 'approved') {
        const ticketCode = generateTicketCode();

        // 1. Extracción de datos del comprador y la transacción
        const email = payment.metadata?.email || payment.payer?.email;
        const name = payment.metadata?.name || payment.payer?.first_name || 'Asistente';
        const lastName = payment.metadata?.last_name || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const amount = payment.transaction_amount || 0;

        // 2. Construcción del contenido del QR (Formato Texto Plano)
        const qrContent = 
          `--- SANTO DESVÍO FESTIVAL ---\n` +
          `Código Ticket: ${ticketCode}\n` +
          `Titular: ${name} ${lastName}\n` +
          `DNI: ${dni}\n` +
          `Email: ${email}\n` +
          `Monto Pagado: $${amount} ARS\n` +
          `ID de Transacción MP: ${id}`;

        // 3. Generación del QR pasando el texto completo en lugar de solo el código
        const qrBase64 = await generateQRCode(qrContent);

        console.log(`[WEBHOOK] Pago Aprobado. Procesando ticket para: ${email} (Código: ${ticketCode})`);

        if (email) {
          // Llamada al servicio de email
          await sendTicketEmail({
            email,
            name,
            lastName,
            ticketCode,
            qrDataUrl: qrBase64,
          });
        } else {
          console.warn('[WEBHOOK] ⚠️ No se encontró ningún email en metadata ni en payer.');
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[WEBHOOK] ❌ Error procesando el webhook:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}