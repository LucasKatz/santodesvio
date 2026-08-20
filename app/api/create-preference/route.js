import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, lastName, dni, email } = await req.json();

    if (!name || !lastName || !dni || !email) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // Configuración de la preferencia en MercadoPago
    const preferenceData = {
      items: [
        {
          title: 'Entrada Santo Desvío Festival',
          unit_price: 15000, // Precio predeterminado
          quantity: 1,
          currency_id: 'ARS',
        },
      ],
      payer: { name, surname: lastName, email },
      metadata: { dni, name, lastName, email },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/festival/ticket`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/festival?status=failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/festival?status=pending`,
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
    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}