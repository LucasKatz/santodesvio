export const metadata = {
  title: "Nuestras cervezas",           // renderiza "Nuestras cervezas | Santo Desvío"
  description:
    "Conocé los estilos de Santo Desvío: [IPA, Golden, Stout...]. Elaboración artesanal en tandas chicas.",
  alternates: { canonical: "/cervezas" },
  openGraph: {
    title: "Nuestras cervezas | Santo Desvío",
    description: "Los estilos que elaboramos en nuestra cervecería artesanal.",
    url: "/cervezas",
  },
};

import BeerCatalogue from '@/components/catalogue';

export default function BeersPage() {
  return <BeerCatalogue />;
}