// app/contacto/page.js
import ContactForm from "@/components/Contacto/contactForm";

export const metadata = {
  title: "Contacto | Santo Desvío",
  description:
    "Escribinos para consultas, pedidos mayoristas, visitas a la fábrica o eventos. Santo Desvío, cerveza artesanal independiente en Ituzaingó, Buenos Aires.",
  keywords: [
    "contacto Santo Desvío",
    "cervecería artesanal Ituzaingó contacto",
    "comprar cerveza artesanal Buenos Aires",
    "cerveza artesanal mayorista Ituzaingó",
    "Santo Desvío festival consultas",
  ],
  alternates: { canonical: "https://www.santodesvio.com.ar/contacto" },
  openGraph: {
    title: "Contacto | Santo Desvío - Cerveza Independiente",
    description:
      "¿Tenés dudas sobre nuestros estilos, visitas a la fábrica o el próximo Santo Desvío Festival? Escribinos directamente.",
    url: "https://www.santodesvio.com.ar/contacto",
    siteName: "Santo Desvío",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Santo Desvío — Cerveza Artesanal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Santo Desvío",
    description: "Consultas, pedidos y eventos en Ituzaingó, Buenos Aires.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto Santo Desvío",
  description: "Página de contacto oficial de Santo Desvío Cervecería Artesanal.",
  url: "https://www.santodesvio.com.ar/contacto",
  mainEntity: {
    "@type": "Brewery",
    name: "Santo Desvío",
    telephone: "+5491155555555",
    email: "santodesvio@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ituzaingó",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  },
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-santo-dark py-12 px-4 flex flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactForm />
    </main>
  );
}