import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#121212] text-white pt-12 pb-6 border-t border-[#F2A21B]/20 font-sans">
      <div className="w-full max-w-[1400px] mx-auto px-4">

        {/* --- ESTRUCTURA DE COLUMNAS DEISGNADAS --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-8 md:gap-0">

          {/* Margen Izquierdo Responsivo (10% en Desktop) */}
          <div className="hidden md:block w-[10%]" />

          {/* COLUMNA 1: NAVEGACIÓN (20% Width - Centrado) */}
          <div className="w-full md:w-[20%] flex flex-col items-center text-center">
            <h3 className="text-[#F2A21B] font-santo-alt text-base font-bold uppercase tracking-widest mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/birras" className="hover:text-[#F2A21B] transition-colors">
                  Birras
                </Link>
              </li>
              <li>
                <Link href="/festival" className="hover:text-[#F2A21B] transition-colors">
                  Festival
                </Link>
              </li>
              <li>
                <Link href="/merch" className="hover:text-[#F2A21B] transition-colors">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/mayoristas" className="hover:text-[#F2A21B] transition-colors">
                  Mayoristas
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 2: LOGO Y FRASE (40% Width - Centrado) */}
          <div className="w-full md:w-[40%] flex flex-col items-center text-center my-4 md:my-0">
            <Link href="/" className="inline-block relative w-48 h-48  transition-transform hover:scale-105">
              <Image
                src="/logoFooter.jpeg"
                alt="Santo Desvío Logo"
                fill
                className="object-contain scale-125"
              />
            </Link>
            <span className="text-[#F2A21B] font-santo-alt text-xl font-bold uppercase tracking-wider">
              Cerveza Independiente
            </span>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
              Ituzaingó, Buenos Aires
            </p>
          </div>

          {/* COLUMNA 3: CONTACTO Y REDES (20% Width - Centrado) */}
          <div className="w-full md:w-[20%] flex flex-col items-center text-center">
            <h3 className="text-[#F2A21B] font-santo-alt text-base font-bold uppercase tracking-widest mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-gray-300 flex flex-col items-center">
              <li>
                <a
                  href="https://wa.me/5491178202532"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F2A21B] transition-colors inline-flex items-center gap-2"
                >
                  <span>💬</span> 11 5555-5555
                </a>
              </li>
              <li>
                <a
                  href="mailto:santodesvio@gmail.com"
                  className="hover:text-[#F2A21B] transition-colors inline-flex items-center gap-2"
                >
                  <span>✉️</span> santodesvio@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/santodesvio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F2A21B] transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 fill-current text-[#F2A21B]"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>@santodesvio</span>
                </a>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-3 max-w-[200px]">
              Retiro en fábrica · A coordinar
            </p>
          </div>

          {/* Margen Derecho Responsivo (10% en Desktop) */}
          <div className="hidden md:block w-[10%]" />

        </div>

        {/* --- LÍNEA DIVISORA Y SECCIÓN INFERIOR --- */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 space-y-2">
          <p className="uppercase tracking-widest text-[#F2A21B]/80 font-semibold">
            Beber con moderación. Prohibida su venta a menores de 18 años.
          </p>
          <p>
            © {new Date().getFullYear()} Santo Desvío · Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}