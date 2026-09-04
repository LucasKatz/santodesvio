import { NextResponse } from 'next/server';

// Sanear URL base sin barras finales
const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const baseUrl = rawBaseUrl.trim().replace(/\/$/, '');

export async function POST(req) {
  try {
    const { items, payer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    // 1. Formatear items del carrito
    const formattedItems = items.map((item, index) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || price <= 0) {
        throw new Error(`El producto "${item.name || index}" tiene un precio inválido.`);
      }

      return {
        id: String(item.id || `item-${index}`),
        title: String(item.name || 'Producto Santo Desvío'),
        unit_price: price,
        quantity: isNaN(quantity) || quantity < 1 ? 1 : quantity,
        currency_id: 'ARS',
        picture_url: item.image?.startsWith('http') ? item.image : `${baseUrl}${item.image || '/logo2.png'}`,
      };
    });

    // 2. Construir preferencia
    const preferenceData = {
      items: formattedItems,
      metadata: {
        name: payer?.name || '',
        last_name: payer?.lastName || '',
        dni: payer?.dni || '',
        phone: payer?.phone || '',
        email: payer?.email || '',
      },
      payer: {
        name: payer?.name || '',
        surname: payer?.lastName || '',
        email: payer?.email || '',
      },
      back_urls: {
        success: `${baseUrl}/thanks`,
        failure: `${baseUrl}/cart?status=failure`,
        pending: `${baseUrl}/cart?status=pending`,
      },
      auto_return: 'approved',
    };

    // 3. Adjuntar Webhook si no estamos en localhost
    if (!baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
      preferenceData.notification_url = `${baseUrl}/api/webhooks/mercadopago`;
    }

    // 4. Crear preferencia en Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN?.trim()}`,
      },
      body: JSON.stringify(preferenceData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[CHECKOUT MP ERROR]:', data);
      return NextResponse.json(
        { error: data.message || 'Error en MercadoPago', details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      init_point: data.sandbox_init_point || data.init_point,
    });

  } catch (error) {
    console.error('Error en /api/checkout:', error.message);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}