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
  "@type": "Brewery", // usá "Organization" si no tenés local abierto al público
  "@id": "https://santodesvio.com.ar/#brewery",
  name: "Santo Desvío",
  url: "https://santodesvio.com.ar",
  logo: "https://santodesvio.com.ar/logo.png",
  image: "https://santodesvio.com.ar/og-image.jpg",
  description:
    "Cervecería artesanal de autor en [CIUDAD], Argentina. Elaboración en tandas chicas.",
  telephone: "+54 9 11 XXXX-XXXX",
  email: "hola@santodesvio.com.ar",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[CALLE Y NÚMERO]",
    addressLocality: "[CIUDAD]",
    addressRegion: "[PROVINCIA]",
    postalCode: "[CP]",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.instagram.com/[usuario]",
    "https://www.facebook.com/[usuario]",
  ],
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
};

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
