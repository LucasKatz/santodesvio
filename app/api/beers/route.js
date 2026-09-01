import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json(
      { error: 'No se encontró la variable MONGODB_URI en .env.local' },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // Base de Datos según tu pantalla de Atlas
    const db = client.db('Beers'); 
    
    // Colección según tu pantalla de Atlas
    const beers = await db.collection('SantoDesvio').find({}).toArray();

    return NextResponse.json(beers);
  } catch (error) {
    console.error('Error en la BD:', error);
    return NextResponse.json(
      { error: 'Error al conectar con MongoDB', details: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}