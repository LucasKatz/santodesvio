// app/page.js
import HeroBanner from '@/components/UserInt/banner';
import FabricaPage from '../components/fabrica/fabrica';

export const metadata = {
  title: {
    absolute: "Santo Desvío | Cerveza artesanal argentina",
  },
  description:
    "Cervecería artesanal Santo Desvío. Elaboramos cerveza de autor en tandas chicas en [CIUDAD], [PROVINCIA]. Conocé nuestros estilos, dónde comprarlos y cómo visitarnos.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Santo Desvío | Cerveza artesanal argentina",
    description:
      "Cervecería artesanal de autor en [CIUDAD]. Nuestros estilos, puntos de venta y contacto.",
    url: "/",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://santodesvio.com.ar/#organization",
  name: "Santo Desvío",
  url: "https://santodesvio.com.ar",
  logo: "https://santodesvio.com.ar/logo.png",
  image: "https://santodesvio.com.ar/og-image.jpg",
  description:
    "Cervecería artesanal de autor con sede en Ituzaingó, Buenos Aires, Argentina. Elaboración en tandas chicas.",
  email: "hola@santodesvio.com.ar",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ituzaingó",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.instagram.com/santodesvio",

  ],
  // Cuando abras el local, volvés a este bloque: cambiás @type a "Brewery",
  // agregás streetAddress y postalCode, telephone y priceRange, y sumás
  // geo + openingHoursSpecification (que ya tenías armado y comentado).
};
  // Descomentá y ajustá solo si tenés local con horarios al público:
  // geo: { "@type": "GeoCoordinates", latitude: -34.6037, longitude: -58.3816 },
  // openingHoursSpecification: [
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     dayOfWeek: ["Thursday", "Friday", "Saturday"],
  //     opens: "19:00",
  //     closes: "01:00",
  //   },
  // ],


export default function Home() {
  return (
    <main className="min-h-screen bg-santo-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroBanner />
      <FabricaPage />
    </main>
  );
}
