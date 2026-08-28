import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-santo-dark">
      <div className="w-full relative h-[320px] sm:h-[450px] md:h-[600px] lg:h-[700px]">
    <Link href="/birras">
        <Image 
          Link="/birras"
          src="/banner.jpeg" 
          alt="Santo Desvío Banner"
          fill
          className="object-fit object-center"
          priority
        />
     </Link>
      </div>
    </section>
  );
}