import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Santo Desvío Festival | Fiesta de Cerveza Artesanal",
  description:
    "Viví la experiencia del Santo Desvío Festival Vol. I. Cerveza artesanal de autor, música en vivo y gastronomía en Ituzaingó, Buenos Aires. ¡Conseguí tus entradas!",
  keywords: [
    "Santo Desvío Festival",
    "festival cerveza artesanal Ituzaingó",
    "entradas fiesta cerveza artesanal",
    "eventos cerveza artesanal Buenos Aires",
    "Santo Desvío Vol I",
  ],
  alternates: { canonical: "https://www.santodesvio.com.ar/festival" },
  openGraph: {
    title: "Santo Desvío Festival Vol. I | Cerveza Independiente",
    description:
      "Asegurá tu lugar en el festival independiente de cerveza artesanal. Música en vivo, gastronomía y los mejores estilos en Ituzaingó.",
    url: "https://www.santodesvio.com.ar/festival",
    siteName: "Santo Desvío",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/FESTIVAL.jpeg",
        width: 1200,
        height: 630,
        alt: "Santo Desvío Festival Vol. I — Afiche Oficial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santo Desvío Festival Vol. I",
    description: "Cerveza artesanal, música en vivo y gastronomía en Ituzaingó.",
    images: ["/FESTIVAL.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Santo Desvío Festival Vol. I",
  description:
    "El festival oficial de cerveza artesanal de Santo Desvío. Cervezas de autor, bandas en vivo y propuesta gastronómica.",
  image: ["https://www.santodesvio.com.ar/FESTIVAL.jpeg"],
  url: "https://www.santodesvio.com.ar/festival",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Santo Desvío Fábrica",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ituzaingó",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Santo Desvío",
    url: "https://www.santodesvio.com.ar",
  },
};

export default function FestivalPage() {
  return (
    <main className="min-h-screen bg-santo-dark flex flex-col items-center justify-center py-10 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Indicador superior sutil */}
      <p className="text-[#F2A21B] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 animate-pulse">
        Haz clic en el flyer para comprar tus entradas
      </p>

      {/* Tarjeta interactiva del flyer */}
      <div className="relative group max-w-lg w-full">
        <Link
          href="/entradas"
          className="block relative overflow-hidden rounded-2xl border-2 border-[#F2A21B]/30 group-hover:border-[#F2A21B] transition-all duration-300 shadow-[0_0_30px_rgba(242,162,27,0.15)] group-hover:shadow-[0_0_50px_rgba(242,162,27,0.35)]"
        >
          <Image
            src="/FESTIVAL.jpeg"
            alt="Santo Desvío Festival Vol. I - Fiesta de Cerveza Artesanal"
            width={700}
            height={1050}
            priority
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />

          {/* Overlay dorado al hacer hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <span className="bg-[#F2A21B] text-[#010101] font-bold uppercase tracking-wider py-3 px-8 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm sm:text-base">
              🎟️ Comprar Entradas
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}