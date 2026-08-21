import { NextResponse } from 'next/server';
import { generateTicketCode, generateQRCode } from '@/services/ticketService';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json({ error: 'Falta el ID de pago' }, { status: 400 });
    }

    // Consultar el estado del pago directamente en la API de MP
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    const payment = await response.json();

    if (payment.status === 'approved') {
      const ticketCode = generateTicketCode();
      const qrDataUrl = await generateQRCode(ticketCode);

      return NextResponse.json({
        status: 'approved',
        ticketCode,
        qrDataUrl,
        userData: {
          name: payment.metadata?.name || payment.payer?.first_name || 'Asistente',
          lastName: payment.metadata?.last_name || payment.payer?.last_name || '',
          dni: payment.metadata?.dni || 'N/A',
          email: payment.payer?.email || '',
        },
      });
    }

    return NextResponse.json({ status: payment.status }, { status: 400 });
  } catch (error) {
    console.error('Error verificando pago:', error);
    return NextResponse.json({ error: 'Error al verificar el pago' }, { status: 500 });
  }
}