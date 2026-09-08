import BeerCard from './cards';
import dbConnect from '@/lib/dbConnect';
import Beer from '@/models/beer';

async function getBeers() {
  try {
    await dbConnect();
    const beers = await Beer.find({}).lean();
    // Convertir _id de ObjectId a String para evitar errores de serialización
    return beers.map((beer) => ({
      ...beer,
      _id: beer._id.toString(),
    }));
  } catch (error) {
    console.error('Error al obtener cervezas:', error);
    return [];
  }
}

export default async function BeerCatalogue() {
  const beers = await getBeers();

  return (
    <div className="bg-black min-h-screen py-10 px-4">
      <div className="w-[80%] max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {beers?.map((beer) => (
          <BeerCard key={beer._id} {...beer} />
        ))}
      </div>
    </div>
  );
}