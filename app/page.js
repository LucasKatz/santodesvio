import Navbar from '@/components/UserInt/navbar';
import HeroBanner from '@/components/UserInt/banner';
import ProductGrid from '@/components/Products/productGrid';
import Footer from '@/components/UserInt/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-santo-dark">
      <Navbar />
      <HeroBanner />
      <ProductGrid />
      <Footer />
    </main>
  );
}