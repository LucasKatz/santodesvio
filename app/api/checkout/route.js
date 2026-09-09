import { NextResponse } from 'next/server';

// 1. Apuntar directamente a tu dominio oficial de Santo Desvío
const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.santodesvio.com.ar';
const DOMAIN = rawBaseUrl.trim().replace(/\/$/, '');

export async function POST(req) {
  try {
    const { items, payer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío o el formato es incorrecto' }, { status: 400 });
    }

    // 2. Mapear y sanear productos
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

    // 3. Construcción de la preferencia
    const preferenceData = {
      items: formattedItems,
      metadata: {
        order_type: 'products',
        name: payer?.name || '',
        last_name: payer?.lastName || '',
        dni: payer?.dni || '',
        phone: payer?.phone || '',
        email: payer?.email || '',
        cart_items: formattedItems.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
      },
      payer: {
        name: payer?.name || '',
        surname: payer?.lastName || '',
        email: payer?.email || '',
        phone: {
          number: payer?.phone || '',
        },
        identification: {
          type: 'DNI',
          number: payer?.dni || '',
        },
      },
      back_urls: {
        success: `${DOMAIN}/thanks`,
        failure: `${DOMAIN}/cart?status=failure`,
        pending: `${DOMAIN}/cart?status=pending`,
      },
      auto_return: 'approved',
      notification_url: `${DOMAIN}/api/webhooks`,
    };

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
      console.error('Error desde MercadoPago API:', data);
      return NextResponse.json({ error: data.message || 'Error en MercadoPago' }, { status: response.status });
    }

    // 4. Retornar SIEMPRE init_point para Cobros Reales
    return NextResponse.json({
      init_point: data.init_point,
    });

  } catch (error) {
    console.error('Error en checkout:', error.message);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}