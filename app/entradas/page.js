import EntradasForm from "@/components/Festival/entradasForm";

export const metadata = {
  title: "Entradas | Santo Desvío Festival",
  description:
    "Conseguí tus entradas para el Santo Desvío Festival. Cerveza artesanal, música en vivo y gastronomía en Ituzaingó, Buenos Aires.",
  keywords: [
    "entradas Santo Desvío festival",
    "festival cerveza artesanal Ituzaingó",
    "comprar tickets Santo Desvío",
    "eventos cerveza artesanal Buenos Aires",
  ],
  alternates: { canonical: "https://www.santodesvio.com.ar/entradas" },
  openGraph: {
    title: "Comprar Entradas | Santo Desvío Festival",
    description:
      "Asegurá tu lugar en el Santo Desvío Festival. Cerveza de autor, música y cultura independiente.",
    url: "https://www.santodesvio.com.ar/entradas",
    siteName: "Santo Desvío",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/FESTIVAL.jpeg",
        width: 1200,
        height: 630,
        alt: "Santo Desvío Festival — Venta de Entradas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entradas | Santo Desvío Festival",
    description: "Asegurá tu lugar en el festival independiente de cerveza.",
    images: ["/FESTIVAL.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Santo Desvío Festival Vol. I",
  startDate: "2026-11-20T18:00:00-03:00", // Modificá con la fecha real de tu evento
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Fábrica Santo Desvío",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ituzaingó",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  },
  image: ["https://www.santodesvio.com.ar/FESTIVAL.jpeg"],
  description: "Festival de cerveza artesanal independiente, música y gastronomía.",
  offers: {
    "@type": "Offer",
    price: "30000",
    priceCurrency: "ARS",
    url: "https://www.santodesvio.com.ar/entradas",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01T00:00:00-03:00",
  },
  organizer: {
    "@type": "Organization",
    name: "Santo Desvío",
    url: "https://www.santodesvio.com.ar",
  },
};

export default function EntradasPage() {
  return (
    <main className="min-h-screen bg-santo-dark flex flex-col items-center justify-center py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EntradasForm />
    </main>
  );
}