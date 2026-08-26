import ContactForm from "@/components/Contacto/contactForm";

export const metadata = {
  title: 'Contacto | Santo Desvío Festival',
  description: 'Envíanos tus consultas sobre el Santo Desvío Festival.',
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-black py-12 px-4 flex items-center justify-center">
      <ContactForm />
    </main>
  );
}