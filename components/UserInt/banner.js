import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-santo-dark">

      {/* --- VISTA DESKTOP (Sin cambios) --- */}
      <div className="hidden sm:block w-full relative aspect-[16/9] md:aspect-[21/9] min-h-[350px]">
        <Link href="/birras" className="block w-full h-full relative z-0">
          <Image
            src="/banner.png"
            alt="Santo Desvío Banner Desktop"
            fill
            sizes="(min-width: 640px) 100vw, 1px"
            className="object-cover object-center"
            priority
          />
        </Link>

        {/* Contenedor Desktop */}
        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-[6%] max-w-[55%] flex flex-col justify-center text-left">
          <span className="text-[16px] uppercase text-[#121212] font-santo-alt tracking-[0.2em] font-bold mb-2 block">
            FÁBRICA REBELDE DE CERVEZA
          </span>

          <h1
            className="text-[76px] font-anton leading-[0.94] text-[#121212] uppercase mb-8"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            Cerveza para <br />
            los que se salieron <br />
            del camino
          </h1>

          <div className="flex items-center gap-[16px]">
            <Link
              href="/birras"
              className="bg-[#121212] hover:bg-[#222] text-[#F0EDE4] font-santo-alt text-[16px] h-[52px] font-bold tracking-wider uppercase px-6 rounded border-2 border-[#121212] shadow-lg transition-all transform hover:scale-105 inline-flex items-center justify-center whitespace-nowrap"
            >
              Nuestras Birras
            </Link>

            <Link
              href="/festival"
              className="bg-transparent hover:bg-[#121212] text-[#121212] hover:text-[#F0EDE4] font-santo-alt text-[16px] h-[52px] font-bold tracking-wider uppercase px-6 rounded border-2 border-[#121212] shadow-lg transition-all transform hover:scale-105 inline-flex items-center justify-center whitespace-nowrap"
            >
              Próximo Evento
            </Link>
          </div>
        </div>
      </div>

      {/* --- VISTA MOBILE (Lata empujada hacia abajo) --- */}
      <div className="sm:hidden w-full relative aspect-[9/18] min-h-[720px] flex flex-col justify-between pt-[30px] pb-10 px-5">

        {/* Imagen Móvil de fondo (Anclada abajo para desplazar la lata hacia el pie) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bannerV2.jpg"
            alt="Santo Desvío Banner Mobile"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* Bloque Superior: Texto + Botones */}
        <div className="relative z-10 flex flex-col gap-6">
          {/* Texto */}
          <div className="text-left">
            <span className="text-[13px] uppercase text-[#121212] font-santo-alt tracking-[0.2em] font-bold mb-1 block">
              FÁBRICA REBELDE DE CERVEZA
            </span>

            <h1
              className="text-[32px] font-anton leading-[0.95] text-[#121212] uppercase"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              Cerveza <br />
              para los que <br />
              se salieron <br />
              del camino
            </h1>
          </div>

          {/* Botones Centrados */}
          <div className="flex flex-col gap-2.5 w-full">
            <Link
              href="/birras"
              className="bg-[#121212] hover:bg-[#222] text-[#F0EDE4] font-santo-alt text-[15px] h-[52px] font-bold tracking-wider uppercase rounded border-2 border-[#121212] shadow-lg flex items-center justify-center w-3/4 text-center mx-auto"
            >
              Nuestras Birras
            </Link>

            <Link
              href="/festival"
              className="bg-transparent hover:bg-[#121212] text-[#121212] hover:text-[#F0EDE4] font-santo-alt text-[15px] h-[52px] font-bold tracking-wider uppercase rounded border-2 border-[#121212] shadow-lg flex items-center justify-center w-3/4 text-center mx-auto"
            >
              Próximo Evento
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}