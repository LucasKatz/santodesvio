import './globals.css';
import Navbar from '@/components/UserInt/navbar';
import Footer from '@/components/UserInt/footer';

export const metadata = {
  title: 'Santo Desvío - Cerveza Artesanal Rebelde',
  description: 'Cambia tu ruta, toma el Santo Desvío.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-santo-dark text-santo-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}