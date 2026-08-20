import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-santo-dark">
      <div className="w-full relative h-[320px] sm:h-[450px] md:h-[600px] lg:h-[700px]">
        <Image 
          src="/banner.jpeg" 
          alt="Santo Desvío Banner"
          fill
          className="object-fit object-center"
          priority
        />
      </div>
    </section>
  );
}