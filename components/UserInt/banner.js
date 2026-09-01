import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-santo-dark">
      {/* 
        Cambiamos la altura fija por un aspect ratio:
        - Mobile: aspect-[4/3] o aspect-square (mantiene la proporción sin aplastar)
        - Tablet/Desktop: aspect-[21/9] o aspect-[16/7] 
      */}
      <div className="w-full relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] min-h-[300px]">
        
        {/* Banner Cliqueable */}
        <Link href="/birras" className="block w-full h-full relative z-0">
          <Image 
            src="/banner.png" 
            alt="Santo Desvío Banner"
            fill
            sizes="100vw"
            className="object-cover object-left-center sm:object-center"
            priority
          />
        </Link>

        {/* Contenedor de Botones Flotantes */}
        <div className="absolute z-10 bottom-4 sm:bottom-8 md:bottom-12 left-[4%] sm:left-[6%] flex flex-wrap gap-2.5 sm:gap-4 max-w-[92%] sm:max-w-[50%]">
          
          {/* Botón 1: Principal */}
          <Link 
            href="/birras" 
            className="bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt text-[10px] xs:text-xs sm:text-base md:text-lg font-bold tracking-wider uppercase px-3 py-1.5 sm:px-6 sm:py-3 rounded border-2 border-[#F2A21B] shadow-lg transition-all transform hover:scale-105"
          >
            Nuestras Birras
          </Link>

          {/* Botón 2: Secundario */}
          <Link 
            href="/festival" 
            className="bg-[#121212]/80 hover:bg-[#121212] text-[#F0EDE4] hover:text-[#F2A21B] font-santo-alt text-[10px] xs:text-xs sm:text-base md:text-lg font-bold tracking-wider uppercase px-3 py-1.5 sm:px-6 sm:py-3 rounded border-2 border-[#F2A21B] shadow-lg backdrop-blur-sm transition-all transform hover:scale-105"
          >
            Próximo Evento
          </Link>

        </div>

      </div>
    </section>
  );
}