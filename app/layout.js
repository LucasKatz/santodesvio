import './globals.css';
import Navbar from '@/components/UserInt/navbar';
import Footer from '@/components/UserInt/footer';
import { CartProvider } from '@/context/CartContext';
import WhatsAppButton from '@/components/UserInt/wppButton';

export const metadata = {
  title: 'Santo Desvío - Cerveza Artesanal Rebelde',
  description: 'Cambia tu ruta, toma el Santo Desvío.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black text-santo-white flex flex-col min-h-screen">
        <CartProvider>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton/>
        </CartProvider>
      </body>
    </html>
  );
}