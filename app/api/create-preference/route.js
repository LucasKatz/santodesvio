import { NextResponse } from 'next/server';

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const baseUrl = rawBaseUrl.trim().replace(/\/$/, '');

export async function POST(req) {
  try {
    const { name, lastName, dni, email } = await req.json();

    if (!name || !lastName || !dni || !email) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

  const preferenceData = {
      items: [
        {
          title: 'Entrada Santo Desvío Festival',
          unit_price: 15000,
          quantity: 1,
          currency_id: 'ARS',
        },
      ],
      payer: { name, surname: lastName, email },
      metadata: { dni, name, lastName, email },
      // OBLIGATORIO EN SANDBOX: Le dice a MP dónde enviar el webhook de este pago
      notification_url: `${baseUrl}/api/webhooks/mercadopago`, 
      back_urls: {
        success: `${baseUrl}/festival/ticket`,
        failure: `${baseUrl}/festival?status=failure`,
        pending: `${baseUrl}/festival?status=pending`,
      },
      auto_return: 'approved',
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceData),
    });

    const data = await response.json();

    // SI MERCADOPAGO DEVUELVE ERROR:
    if (!response.ok) {
      console.error('--- ERROR DE MERCADOPAGO ---');
      console.error(JSON.stringify(data, null, 2));
      console.error('-----------------------------');
      return NextResponse.json({ error: data.message || 'Error en MercadoPago' }, { status: response.status });
    }

    // RETORNA LA URL DE SANDBOX DIRECTA
    return NextResponse.json({ 
      init_point: data.sandbox_init_point || data.init_point 
    });

  } catch (error) {
    console.error('Error interno del servidor:', error);
    return NextResponse.json({ error: 'Error interno al procesar el pago' }, { status: 500 });
  }
}