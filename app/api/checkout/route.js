import { NextResponse } from 'next/server';

// 1. Definición y saneamiento global de la URL base
const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const baseUrl = rawBaseUrl.trim().replace(/\/$/, '');

export async function POST(req) {
  try {
    // Recibimos los items del carrito y el formulario del comprador (payer)
    const { items, payer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío o el formato es incorrecto' }, { status: 400 });
    }

    // Mapear y sanear cada ítem
    const formattedItems = items.map((item, index) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || price <= 0) {
        throw new Error(`El producto "${item.name || index}" tiene un precio inválido: ${item.price}`);
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

    // Construcción de la preferencia para MercadoPago
    const preferenceData = {
      items: formattedItems,
      // Metadata donde guardamos los datos del formulario para recuperarlos en el webhook sin guardar en DB
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
        success: 'https://santodesvio-ebon.vercel.app/thanks',
        failure: 'https://santodesvio-ebon.vercel.app/cart?status=failure',
        pending: 'https://santodesvio-ebon.vercel.app/cart?status=pending',
      },
      // Retorno automático para redirigir apenas se procese el pago
      auto_return: 'approved',
    };

    // Solo adjuntar Webhook en entornos que no sean localhost
    if (!baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
      preferenceData.notification_url = `${baseUrl}/api/webhooks/mercadopago`;
    }

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
      console.error('=== ERROR MERCADOPAGO DETALLADO ===');
      console.error(JSON.stringify(data, null, 2));
      console.error('==================================');

      return NextResponse.json(
        {
          error: data.message || 'Error en la API de MercadoPago',
          details: data.cause || data
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      init_point: data.sandbox_init_point || data.init_point,
    });

  } catch (error) {
    console.error('Error interno en endpoint checkout:', error.message);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}