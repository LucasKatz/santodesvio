import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-santo-dark">
      {/* 
        Contenedor dinámico:
        - Mobile (< sm): Proporción vertical aspect-[2/3] alineada a la imagen vertical.
        - Desktop (>= sm): Proporción apaisada aspect-[16/9] y aspect-[21/9].
      */}
      <div className="w-full relative aspect-[2/3] sm:aspect-[16/9] md:aspect-[21/9] min-h-[480px] sm:min-h-[350px]">
        
        {/* Banner Cliqueable */}
        <Link href="/birras" className="block w-full h-full relative z-0">
          {/* Imagen Móvil Vertical (Visible solo en mobile) */}
          <Image 
            src="/bannerV.png" 
            alt="Santo Desvío Banner Mobile"
            fill
            sizes="(max-width: 639px) 100vw, 1px"
            className="object-cover object-center block sm:hidden"
            priority
          />

          {/* Imagen Desktop Horizontal (Visible de sm en adelante) */}
          <Image 
            src="/banner.png" 
            alt="Santo Desvío Banner Desktop"
            fill
            sizes="(min-width: 640px) 100vw, 1px"
            className="object-cover object-center hidden sm:block"
            priority
          />
        </Link>

        {/* 
          Contenedor de Botones Flotantes:
          - Mobile (< sm): Posicionado en bottom-3, centrado horizontalmente (left-1/2 -translate-x-1/2) entre los dos ángeles.
          - Desktop (>= sm): Posicionado en bottom-8/12, alineado a la izquierda (left-[6%]).
        */}
        <div className="absolute z-10 bottom-3 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[12%] flex sm:flex-wrap gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start px-3 sm:px-0 max-w-[95%] sm:max-w-[50%]">
          
          {/* Botón 1: Principal */}
          <Link 
            href="/birras" 
            className="bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt text-[11px] sm:text-base md:text-lg font-bold tracking-wider uppercase px-3.5 py-2 sm:px-6 sm:py-3 rounded border-2 border-[#F2A21B] shadow-lg transition-all transform hover:scale-105 whitespace-nowrap text-center"
          >
            Nuestras Birras
          </Link>

          {/* Botón 2: Secundario */}
          <Link 
            href="/festival" 
            className="bg-[#121212]/90 hover:bg-[#121212] text-[#F0EDE4] hover:text-[#F2A21B] font-santo-alt text-[11px] sm:text-base md:text-lg font-bold tracking-wider uppercase px-3.5 py-2 sm:px-6 sm:py-3 rounded border-2 border-[#F2A21B] shadow-lg backdrop-blur-sm transition-all transform hover:scale-105 whitespace-nowrap text-center"
          >
            Próximo Evento
          </Link>

        </div>

      </div>
    </section>
  );
}