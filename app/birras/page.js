export const metadata = {
  title: "Nuestras cervezas",
  description:
    "Conocé nuestros 5 estilos: Patrona (Argenta Pale Ale), Halo (Hoppy Golden), Novicia (Cream Ale), Tinieblas (Stout) y Mártir (Red Ale). Elaboración artesanal en tandas chicas en Ituzaingó, Buenos Aires.",
  keywords: [
    "cerveza artesanal Ituzaingó",
    "Pale Ale artesanal",
    "Golden Ale artesanal",
    "Cream Ale artesanal",
    "Stout artesanal",
    "Red Ale artesanal",
    "Santo Desvío cervezas",
  ],
  alternates: { canonical: "/birras" },
  openGraph: {
    title: "Nuestras cervezas | Santo Desvío",
    description:
      "5 estilos de autor: Pale Ale, Golden, Cream Ale, Stout y Red Ale. Elaboración artesanal en tandas chicas.",
    url: "/birras",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Santo Desvío — nuestras cervezas artesanales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuestras cervezas | Santo Desvío",
    description: "5 estilos de autor elaborados en Ituzaingó, Buenos Aires.",
    images: ["/og-image.jpg"],
  },
};

import BeerCatalogue from '@/components/catalogue';

export default function BeersPage() {
  return <BeerCatalogue />;
}
