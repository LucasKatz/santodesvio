import { NextResponse } from 'next/server';

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const baseUrl = rawBaseUrl.trim().replace(/\/$/, '');
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío o el formato es incorrecto' }, { status: 400 });
    }

    // Definir baseUrl (asegúrate de tener esta variable definida o tomada de los headers/env)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Mapear y sanear cada ítem para evitar valores `NaN` o `undefined`
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

    const preferenceData = {
      items: formattedItems,
      back_urls: {
        // 1. Redirección al finalizar la compra con éxito
        success: `${baseUrl}/thanks`,
        failure: `${baseUrl}/cart?status=failure`,
        pending: `${baseUrl}/cart?status=pending`,
      },
      // 2. Retorno automático habilitado al aprobar el pago
      auto_return: 'approved',
    };

    // MercadoPago no acepta notification_url apuntando a localhost
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