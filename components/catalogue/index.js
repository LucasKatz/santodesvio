import BeerCard from './cards';
import clientPromise from '@/mongodb';

async function getBeers() {
  try {
    const client = await clientPromise;
    
    // Apuntamos directo a la DB "Beers" y a la colección "SantoDesvio"
    const db = client.db("Beers");
    const beers = await db.collection("SantoDesvio").find({}).toArray();

    return beers.map((beer) => ({
      ...beer,
      _id: beer._id.toString(),
    }));
  } catch (error) {
    console.error("Error al obtener cervezas:", error);
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