import HeroBanner from '@/components/UserInt/banner';
import ProductGrid from '@/components/Products/productGrid';


export default function Home() {
  return (
    <main className="min-h-screen bg-santo-dark">
  
      <HeroBanner />
      <ProductGrid />
  
    </main>
  );
}