import { NextResponse } from 'next/server';

// Dominio principal de producción de Vercel para las devoluciones y Webhooks
const DOMAIN = 'https://santodesvio-ebon.vercel.app';

export async function POST(req) {
  try {
    const { items, payer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío o el formato es incorrecto' }, { status: 400 });
    }

    // 1. Mapear y sanear cada ítem recibido
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
        picture_url: item.image?.startsWith('http') ? item.image : `${DOMAIN}${item.image || '/logo2.png'}`,
      };
    });

    // 2. Construir el objeto de preferencia para Mercado Pago
    const preferenceData = {
      items: formattedItems,
      // Metadata para recuperar los datos en el webhook sin necesidad de base de datos
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
        success: `${DOMAIN}/thanks`,
        failure: `${DOMAIN}/cart?status=failure`,
        pending: `${DOMAIN}/cart?status=pending`,
      },
      auto_return: 'approved',
      // URL a la que Mercado Pago enviará las notificaciones cuando el pago cambie de estado
      notification_url: `${DOMAIN}/api/webhooks/mercadopago`,
    };

    console.log('👉 URL de Webhook enviada a Mercado Pago:', preferenceData.notification_url);

    // 3. Crear la preferencia llamando a la API de Mercado Pago
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
          details: data.cause || data,
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