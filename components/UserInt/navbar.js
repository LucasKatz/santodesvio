import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="bg-[#121212] relative z-50 pt-2 pb-2 mt-8">
      {/* Marco con doble borde dorado */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-2 border-[#F2A21B] py-2 relative flex items-center justify-between">
          
          {/* Enlaces Izquierda */}
          <div className="flex items-center gap-8 font-santo-alt text-lg md:text-xl text-white tracking-wider uppercase pl-6">
            <a href="#cervezas" className="hover:text-santo-ochre transition-colors">Nuestras Birras</a>
            <a href="#fabrica" className="hover:text-santo-ochre transition-colors">La Fábrica</a>
          </div>

          {/* Logo Central Flotante (sobresale por debajo del header) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden border-4 border-[#F2A21B] bg-[#121212] shadow-2xl">
              <Image 
                src="/Logo.jpeg" 
                alt="Santo Desvío Logo" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Enlaces Derecha */}
          <div className="flex items-center gap-8 font-santo-alt text-lg md:text-xl text-white tracking-wider uppercase pr-6">
            <a href="#merch" className="hover:text-santo-ochre transition-colors">Merch</a>
            <a href="#merch" className="hover:text-santo-ochre transition-colors">Merch</a>
            <a href="#contacto" className="hover:text-santo-ochre transition-colors">Contacto</a>
          </div>

        </div>
      </div>
    </header>
  );
}