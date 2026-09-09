

import ContactForm from "@/components/Contacto/contactForm";

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
export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-black py-12 px-4 flex items-center justify-center">
      <ContactForm />
    </main>
  );
}