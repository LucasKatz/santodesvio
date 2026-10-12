import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateQRCode } from '@/app/services/ticketService';
import clientPromise from '@/mongodb';

export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendCustomerEmailWithQR({ email, name, lastName, qrDataUrl, paymentId, amount }) {
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');
  const qrBuffer = Buffer.from(base64Data, 'base64');

  const mailOptions = {
    from: `"Santo Desvío" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🎟️ Tu Comprobante Santo Desvío #${paymentId}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 25px; border-radius: 8px; max-width: 500px; margin: 0 auto; border: 2px solid #F2A21B;">
        <h1 style="color: #F2A21B; text-align: center; margin-bottom: 5px;">¡Gracias ${name} ${lastName}!</h1>
        <p style="text-align: center; color: #ccc;">Tu compra ha sido confirmada. Muestra este código QR al ingresar:</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <img src="cid:qrcodeimg" alt="Código QR Pedido" style="width: 220px; height: 220px; border: 3px solid #F2A21B; background-color: #fff; padding: 5px;" />
        </div>
        
        <div style="background-color: #1a1a1a; padding: 15px; border-radius: 6px; font-size: 14px; text-align: center;">
          <p style="margin: 4px 0;"><strong>N° Transacción:</strong> <span style="color: #F2A21B;">#${paymentId}</span></p>
          <p style="margin: 4px 0;"><strong>Monto Abonado:</strong> $${Number(amount).toLocaleString('es-AR')} ARS</p>
        </div>

        <p style="text-align: center; margin-top: 20px; color: #F2A21B; font-weight: bold;">¡Nos vemos en Santo Desvío!</p>
      </div>
    `,
    attachments: [
      {
        filename: `comprobante-${paymentId}.png`,
        content: qrBuffer,
        cid: 'qrcodeimg',
      },
    ],
  };

  return await transporter.sendMail(mailOptions);
}

async function sendAdminEmail({ adminEmail, name, lastName, dni, phone, email, items, amount, paymentId }) {
  let itemsFormattedText = '';
  if (items && items.length > 0) {
    itemsFormattedText = items
      .map(item => `• ${item.title || item.name || 'Producto'} x${item.quantity || 1} — $${(item.unit_price || item.price || 0).toLocaleString('es-AR')} ARS`)
      .join('\n');
  } else {
    itemsFormattedText = '• Detalle no especificado / Compra general';
  }

  const emailContent = `
============================================
🍺 NUEVO PEDIDO CONFIRMADO - SANTO DESVÍO
============================================

DATOS DEL CLIENTE:
--------------------------------------------
- Nombre completo: 
${name} ${lastName}
- DNI: 
${dni}
- Teléfono: 
${phone}
- Email del cliente: 
${email}

DETALLE DEL PEDIDO:
--------------------------------------------
${itemsFormattedText}

RESUMEN DE PAGO:
--------------------------------------------
- ID Transacción MP: 
${paymentId}
- Total Abonado: $
${Number(amount).toLocaleString('es-AR')} ARS
- Estado: APROBADO

============================================
Santo Desvío - Sistema de Notificaciones
  `;

  const mailOptions = {
    from: `"Notificaciones Santo Desvío" <${process.env.GMAIL_USER}>`,
    to: adminEmail,
    subject: `📋 NUEVA VENTA #${paymentId} - ${name} ${lastName}`,
    text: emailContent,
    html: `<pre style="font-family: monospace; background-color: #121212; color: #F2A21B; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.5;">${emailContent}</pre>`,
  };

  return await transporter.sendMail(mailOptions);
}

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    let topic = searchParams.get('topic') || searchParams.get('type');
    let id = searchParams.get('id') || searchParams.get('data.id');

    if (!id || !topic) {
      try {
        const body = await req.json();
        topic = topic || body.type || (body.action?.includes('payment') ? 'payment' : null);
        id = id || body.data?.id || body.id;
      } catch (e) {}
    }

    if (topic === 'payment' && id) {
      const client = await clientPromise;
      const db = client.db('Merch');
      const processedCollection = db.collection('processed_payments');

      // 1. INTENTO DE REGISTRO INMEDIATO (CANDADO DE SEGURIDAD)
      // Si el webhook duplicado llega 1 segundo después, rebotará AQUÍ y no continuará.
      try {
        await processedCollection.insertOne({
          paymentId: String(id),
          processedAt: new Date(),
          status: 'processing'
        });
      } catch (mongoError) {
        // Código 11000 = Clave duplicada en MongoDB
        if (mongoError.code === 11000) {
          console.log(`[WEBHOOK MP] ⚠️ Pago #${id} ya fue procesado o está en proceso. Omitiendo duplicado.`);
          return NextResponse.json({ message: 'Pago ya procesado' }, { status: 200 });
        }
        throw mongoError;
      }

      // 2. CONSULTA A MERCADO PAGO
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN?.trim()}`,
        },
      });

      const payment = await response.json();

      if (response.ok && payment.status === 'approved') {
        const email = payment.metadata?.email || payment.payer?.email || '';
        const name = payment.metadata?.name || payment.payer?.first_name || 'Cliente';
        const lastName = payment.metadata?.last_name || payment.metadata?.lastName || payment.payer?.last_name || '';
        const dni = payment.metadata?.dni || 'Sin especificar';
        const phone = payment.metadata?.phone || 'Sin especificar';
        const amount = payment.transaction_amount || 0;
        
        const rawItems = payment.metadata?.cart_items || payment.additional_info?.items || [];
        const items = Array.isArray(rawItems) ? rawItems : [];

        const ADMIN_EMAIL = 'santodesvio@gmail.com';

        let itemsSummary = items.length > 0
          ? items.map(i => `${i.quantity || 1}x ${i.title || i.name || 'Producto'}`).join(', ')
          : 'Compra general';

        const qrTextPayload = 
          `--- SANTO DESVÍO ---\n` +
          `Pedido MP: #${id}\n` +
          `Cliente: ${name} ${lastName}\n` +
          `DNI: ${dni}\n` +
          `Detalle: ${itemsSummary}\n` +
          `Total: $${amount} ARS`;

        const qrBase64 = await generateQRCode(qrTextPayload);

        // 3. ENVIAR CORREOS EN PARALELO
        await Promise.all([
          email ? sendCustomerEmailWithQR({
            email,
            name,
            lastName,
            qrDataUrl: qrBase64,
            paymentId: id,
            amount
          }) : Promise.resolve(),

          sendAdminEmail({
            adminEmail: ADMIN_EMAIL,
            name,
            lastName,
            dni,
            phone,
            email,
            items,
            amount,
            paymentId: id
          })
        ]);

        // 4. ACTUALIZAR DOCUMENTO EN MONGO CON LOS DATOS FINALES
        await processedCollection.updateOne(
          { paymentId: String(id) },
          { 
            $set: { 
              status: 'completed', 
              customerEmail: email, 
              amount: amount 
            } 
          }
        );

        console.log(`[WEBHOOK MP] 🟢 Procesado correctamente e mails enviados: #${id}`);
      } else {
        // Si el pago no fue aprobado, liberamos el registro para que pueda reintentarse en el futuro
        await processedCollection.deleteOne({ paymentId: String(id) });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK MP] Error grave:', error);
    return NextResponse.json({ received: true, error: error.message }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Webhook Activo' }, { status: 200 });
}