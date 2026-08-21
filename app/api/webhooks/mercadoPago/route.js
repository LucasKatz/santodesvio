import { NextResponse } from 'next/server';
import { generateTicketCode, generateQRCode } from '@/services/ticketService';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get('topic') || searchParams.get('type');
    const id = searchParams.get('id') || searchParams.get('data.id');

    if (topic === 'payment' && id) {
      // Verifica el pago de prueba con la API usando el MP_ACCESS_TOKEN de prueba
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      const payment = await response.json();

      if (payment.status === 'approved') {
        const ticketCode = generateTicketCode();
        const qrBase64 = await generateQRCode(ticketCode);

        console.log('--- ¡PAGO DE PRUEBA APROBADO! ---');
        console.log(`Cliente: ${payment.payer.email}`);
        console.log(`Código generado: ${ticketCode}`);
        console.log('---------------------------------');
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error en Webhook:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}