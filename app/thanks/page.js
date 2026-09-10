// app/thanks/page.js
import ThanksContent from "@/components/thanks/thanks";

export const metadata = {
  title: "¡Gracias por tu compra! | Santo Desvío",
  description:
    "Tu pedido ha sido procesado exitosamente. Gracias por elegir Santo Desvío, cerveza artesanal independiente.",
  robots: {
    index: false, 
    follow: false,
  },
  alternates: { canonical: "https://www.santodesvio.com.ar/thanks" },
  openGraph: {
    title: "¡Gracias por tu compra! | Santo Desvío",
    description: "Confirmación de compra en Santo Desvío.",
    url: "https://www.santodesvio.com.ar/thanks",
    siteName: "Santo Desvío",
    type: "website",
  },
};

export default function ThanksPage() {
  return (
    <main className="min-h-[80vh] bg-santo-dark text-[#F0EDE4] flex items-center justify-center px-4 py-12">
      <ThanksContent />
    </main>
  );
}