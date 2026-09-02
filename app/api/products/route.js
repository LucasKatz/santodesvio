import { NextResponse } from 'next/server';
import clientPromise from '@/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const client = await clientPromise;
    const db = client.db('santo_desvio'); // Cambia por el nombre real de tu base de datos

    // Filtrar por categoría si viene en los Query Params (ej: ?category=merchandising)
    const query = category ? { category } : {};
    
    const products = await db.collection('products').find(query).toArray();

    // Mapear _id de MongoDB a un string para evitar errores de serialización
    const formattedProducts = products.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error('Error al consultar MongoDB:', error);
    return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 });
  }
}