import MerchCard from "@/components/Merch/MerchCard";
import clientPromise from "@/mongodb";

export const metadata = {
  title: "Merchandising Oficial | Santo Desvío",
  description:
    "Llevá la actitud rebelde a todos lados. Remeras, vasos, gorras y accesorios oficiales de Santo Desvío, cerveza artesanal independiente.",
  keywords: [
    "merchandising Santo Desvío",
    "remeras cerveza artesanal",
    "vasos cerveceros Ituzaingó",
    "accesorios cerveza independiente",
    "tienda oficial Santo Desvío",
  ],
  alternates: { canonical: "https://www.santodesvio.com.ar/merch" },
  openGraph: {
    title: "Merchandising Oficial | Santo Desvío - Cerveza Independiente",
    description:
      "Remeras, vasos y accesorios con el sello distintivo de nuestra fábrica.",
    url: "https://www.santodesvio.com.ar/merch",
    siteName: "Santo Desvío",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Merchandising Oficial Santo Desvío",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchandising Oficial | Santo Desvío",
    description: "Remeras, vasos y accesorios con el sello distintivo de Santo Desvío.",
    images: ["/og-image.jpg"],
  },
};

// Consulta directa a MongoDB sin pasar por HTTP/fetch
async function getMerchandise() {
  try {
    const client = await clientPromise;
    const db = client.db("Merch"); 

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Merchandising Oficial Santo Desvío",
    description: "Catálogo de ropa y accesorios oficiales de la cervecería Santo Desvío.",
    url: "https://www.santodesvio.com.ar/merch",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: product.imageUrl,
          description: product.description,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "ARS",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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