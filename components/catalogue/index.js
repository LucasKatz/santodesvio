import mongoose from 'mongoose'; // Faltaba esta importación
import BeerCard from './cards';
import dbConnect from '@/lib/dbConnect';
import Beer from '@/models/beer'; // Corregido a Mayúscula 'Beer'

async function getBeers() {
  try {
    await dbConnect();
    
    // Ahora mongoose está importado correctamente
    console.log("Conectado a la DB:", mongoose.connection.name); 

    const beers = await Beer.find({}).lean();
    console.log("Cervezas encontradas:", beers.length);

    return beers.map((beer) => ({
      ...beer,
      _id: beer._id.toString(),
    }));
  } catch (error) {
    console.error('Error al obtener cervezas desde MongoDB:', error);
    return [];
  }
}

export default async function BeerCatalogue() {
  const beers = await getBeers();

  if (!beers || beers.length === 0) {
    return (
      <div className="bg-black min-h-screen py-10 text-center text-[#F2A21B] font-santo-alt uppercase text-lg">
        No se encontraron cervezas en la base de datos.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-10 px-4">
      <div className="w-[80%] max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {beers.map((beer) => (
          <BeerCard key={beer._id} {...beer} />
        ))}
      </div>
    </div>
  );
}