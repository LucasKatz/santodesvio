import { NextResponse } from 'next/server';
import clientPromise from '@/mongodb';

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Ingresá un código' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    // Mapeo de códigos a su porcentaje de descuento respectivo
    const discountRules = {
      // 25% de descuento
      [process.env.DISCOUNT_CODE_FACU?.toUpperCase()]: { percentage: 25, key: 'FACU' },
      [process.env.DISCOUNT_CODE_COSLO?.toUpperCase()]: { percentage: 25, key: 'COSLO' },
      [process.env.DISCOUNT_CODE_CHUCHO?.toUpperCase()]: { percentage: 25, key: 'CHUCHO' },
      [process.env.DISCOUNT_CODE_SINSA?.toUpperCase()]: { percentage: 25, key: 'SINSA' },

      // 50% de descuento
      [process.env.DISCOUNT_CODE_ANTO?.toUpperCase()]: { percentage: 50, key: 'ANTO' },
      [process.env.DISCOUNT_CODE_FRAN?.toUpperCase()]: { percentage: 50, key: 'FRAN' },
    };

    const match = discountRules[cleanCode];

    if (!match) {
      return NextResponse.json(
        { valid: false, message: 'Código de descuento no válido.' },
        { status: 400 }
      );
    }

    // Registrar o incrementar el uso del código en la base de datos
    const client = await clientPromise;
    const db = client.db('Merch'); // Cambiar por el nombre de tu base de datos si aplica

    await db.collection('discount_usage').updateOne(
      { code: cleanCode },
      {
        $inc: { usageCount: 1 },
        $set: {
          codeKey: match.key,
          discountPercentage: match.percentage,
          lastUsedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      valid: true,
      discountPercentage: match.percentage,
      appliedCode: cleanCode,
    });
  } catch (error) {
    console.error('Error al validar el código:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}