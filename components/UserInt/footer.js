import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#121212] py-6 px-3 sm:py-8 sm:px-6 lg:px-8 text-[#F0EDE4] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Contenedor principal con marco dorado */}
        <div className="border-2 border-[#F2A21B] p-5 sm:p-6 lg:p-8 relative flex flex-col lg:grid lg:grid-cols-3 items-center justify-between gap-6">

          {/* LADO IZQUIERDO: Redes y llamada a la acción */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
            <p className="font-santo-alt text-xs sm:text-sm text-[#F0EDE4] tracking-wider uppercase max-w-[250px]">
              Síguenos en redes para enterarte de todas las novedades
            </p>
            
            <a
              href="https://www.instagram.com/santodesvio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F2A21B] hover:text-[#F0EDE4] transition-colors group"
            >
              <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-santo-alt text-base tracking-wider uppercase font-bold">
                Santo Desvío
              </span>
            </a>
          </div>

          {/* CENTRO: Logo Central (Se mantiene intacto) */}
          <div className="flex justify-center my-2 lg:my-0">
            {/* Móvil y Tablet */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full overflow-hidden border-2 border-[#F2A21B] bg-[#121212] shadow-xl shrink-0 lg:hidden">
              <Image
                src="/Logo.jpeg"
                alt="Santo Desvío Logo"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover"
                priority
              />
            </div>

            {/* Desktop */}
            <div className="hidden lg:block w-32 h-32 relative rounded-full overflow-hidden border-2 border-[#F2A21B] bg-[#121212] shadow-xl transition-transform hover:scale-105 duration-300 shrink-0">
              <Image
                src="/logo2.png"
                alt="Santo Desvío Logo"
                fill
                sizes="128px"
                className="object-contain object-center scale-132"
                priority
              />
            </div>
          </div>

          {/* LADO DERECHO: Espacio vacío para balancear el layout en desktop */}
          <div className="hidden lg:block"></div>

        </div>

        {/* Copyright inferior */}
        <div className="mt-4 sm:mt-6 text-center font-santo-alt text-xs sm:text-sm lg:text-base text-[#F0EDE4] tracking-widest uppercase">
          © {new Date().getFullYear()} SANTO DESVÍO - FÁBRICA REBELDE DE CERVEZA
        </div>

      </div>
    </footer>
  );
}