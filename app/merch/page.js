import MerchCard from "@/components/Merch/MerchCard";
import clientPromise from "@/mongodb";

// Esta función ahora consulta directamente a MongoDB sin pasar por HTTP/fetch
async function getMerchandise() {
  try {
    const client = await clientPromise;
    
    // Aquí especificas el NOMBRE DE TU BASE DE DATOS en Atlas
    const db = client.db("Merch"); 

    // Aquí especificas el NOMBRE DE TU COLECCIÓN
    const products = await db
      .collection("Merch") 
      .find({ category: "merchandising" })
      .toArray();

    // Limpieza de ObjectIds para evitar errores de serialización en React
    return products.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    return [];
  }
}

export default async function MerchPage() {
  const products = await getMerchandise();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl text-[#F2A21B] font-bold text-center mb-8 uppercase">
        Merchandising Oficial
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <MerchCard
            key={product._id}
            id={product.id}
            name={product.name}
            type={product.type}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
            variants={product.variants}
          />
        ))}
      </div>
    </div>
  );
}