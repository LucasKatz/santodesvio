import ContactForm from "@/components/Contacto/contactForm";

export const metadata = {
  title: "Contacto",
  description:
    "Escribinos para consultas, pedidos o eventos. Santo Desvío, cervecería artesanal en Ituzaingó, Buenos Aires.",
  keywords: [
    "contacto Santo Desvío",
    "cervecería artesanal Ituzaingó contacto",
    "comprar cerveza artesanal Buenos Aires",
  ],
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Santo Desvío",
    description:
      "Consultas, pedidos y eventos. Cervecería artesanal en Ituzaingó, Buenos Aires.",
    url: "/contacto",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Santo Desvío — contacto",
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

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-black py-12 px-4 flex items-center justify-center">
      <ContactForm />
    </main>
  );
}