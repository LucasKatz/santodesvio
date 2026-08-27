'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#121212] relative z-50 pt-2 pb-2 mt-4 sm:mt-8">
      {/* Marco con doble borde dorado */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-2 border-[#F2A21B] py-2 px-4 md:px-6 relative flex items-center justify-between">

          {/* Botón Hamburguesa (solo visible en pantallas pequeñas) */}
          <button
            onClick={toggleMenu}
            type="button"
            className="md:hidden text-[#F2A21B] hover:text-white focus:outline-none p-1"
            aria-label="Abrir menú"
          >
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>

          {/* Enlaces Izquierda (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-santo-alt text-lg md:text-xl text-white tracking-wider uppercase">
            <a href="birras" className="hover:text-santo-ochre transition-colors">Nuestras Birras</a>
            <a href="fabrica" className="hover:text-santo-ochre transition-colors">La Fábrica</a>
          </div>

          {/* Logo Central Flotante */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden border-4 border-[#F2A21B] bg-[#121212] shadow-2xl">
              <Image 
                src="/Logo.jpeg" 
                alt="Santo Desvío Logo" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Enlaces Derecha (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-santo-alt text-lg md:text-xl text-white tracking-wider uppercase">
            <a href="festival" className="hover:text-santo-ochre transition-colors">Eventos</a>
            <a href="merch" className="hover:text-santo-ochre transition-colors">Merch</a>
            <a href="contacto" className="hover:text-santo-ochre transition-colors">Contacto</a>
          </div>

          {/* Spacer invisible para equilibrar el botón hamburguesa en móvil */}
          <div className="w-8 md:hidden" aria-hidden="true"></div>

        </div>

        {/* Menú Desplegable Móvil */}
        {isOpen && (
          <div className="md:hidden mt-2 border-2 border-[#F2A21B] bg-[#121212] p-4 text-center">
            <nav className="flex flex-col gap-4 font-santo-alt text-lg text-white tracking-wider uppercase">
              <a 
                href="birras" 
                onClick={() => setIsOpen(false)} 
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Nuestras Birras
              </a>
              <a 
                href="fabrica" 
                onClick={() => setIsOpen(false)} 
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                La Fábrica
              </a>
              <a 
                href="festival" 
                onClick={() => setIsOpen(false)} 
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Eventos
              </a>
              <a 
                href="merch" 
                onClick={() => setIsOpen(false)} 
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Merch
              </a>
              <a 
                href="contacto" 
                onClick={() => setIsOpen(false)} 
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}