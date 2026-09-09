'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#121212] relative z-50 pt-2 pb-2 mt-4 sm:mt-8">
      {/* Marco con doble borde dorado */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Contenedor padre con alineación vertical */}
        <div className="border-2 border-[#F2A21B] py-2 px-4 md:px-6 relative flex items-center justify-between">

          {/* Botón Hamburguesa */}
          <button
            onClick={toggleMenu}
            type="button"
            className="md:hidden text-[#F2A21B] hover:text-white focus:outline-none p-1 flex items-center justify-center"
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
            <Link href="/birras" className="hover:text-santo-ochre transition-colors">Nuestras Birras</Link>
            <Link href="/festival" className="hover:text-santo-ochre transition-colors">Eventos</Link>
          </div>

          {/* Logo Central Flotante */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <Link href="/" className="block group">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-[#F2A21B] bg-[#121212] shadow-2xl transition-transform group-hover:scale-105">
                <Image
                  src="/logo2.png"
                  alt="Santo Desvío Logo"
                  fill
                  className="object-contain object-center scale-132"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Enlaces Derecha + Carrito (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-santo-alt text-lg md:text-xl text-white tracking-wider uppercase">
            <Link href="/merch" className="hover:text-santo-ochre transition-colors">Merch</Link>
            <Link href="/contacto" className="hover:text-santo-ochre transition-colors">Contacto</Link>
            
            {/* Ícono Carrito (Desktop) */}
            <Link 
              href="/cart" 
              aria-label="Ver carrito" 
              className="text-[#F2A21B] hover:text-white transition-colors p-1"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.8} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                />
              </svg>
            </Link>
          </div>

          {/* Ícono Carrito en la barra superior (Móvil) */}
          <Link 
            href="/cart" 
            aria-label="Ver carrito" 
            className="md:hidden text-[#F2A21B] hover:text-white transition-colors p-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.8} 
              stroke="currentColor" 
              className="w-7 h-7"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
              />
            </svg>
          </Link>

        </div>

        {/* Menú Desplegable Móvil */}
        {isOpen && (
          <div className="md:hidden mt-2 border-2 border-[#F2A21B] bg-[#121212] p-4 text-center">
            <nav className="flex flex-col gap-4 font-santo-alt text-lg text-white tracking-wider uppercase">
              <Link
                href="/birras"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Nuestras Birras
              </Link>
              <Link
                href="/festival"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Eventos
              </Link>
              <Link
                href="/merch"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Merch
              </Link>
              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#F2A21B] transition-colors py-1"
              >
                Contacto
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#F2A21B] transition-colors py-1 text-[#F2A21B] flex items-center justify-center gap-2"
              >
                <span>Carrito</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.8} 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                  />
                </svg>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}