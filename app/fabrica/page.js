import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'La Fábrica | Santo Desvío - Cerveza Artesanal',
  description: 'Conoce la historia detrás de Santo Desvío y descubre el origen de nuestra cerveza artesanal rebelde.',
};

export default function FabricaPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* --- SECCIÓN 1: HISTORIA --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna Imagen */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/50 to-amber-700/30 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-zinc-950 shadow-2xl">
              <Image
                src="/fabric.png" // Asegúrate de colocar una foto de la fábrica en /public
                alt="Fábrica de Cerveza Santo Desvío"
                fill
                priority
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Columna Texto / Storytelling */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                El Origen
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight uppercase">
              Nuestra <span className="text-[#D4AF37]">Historia</span>
            </h1>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Ficha de Valores Rápidos */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-zinc-800/80">
              <div>
                <span className="block text-[#D4AF37] font-bold text-lg">100% Artesanal</span>
                <span className="text-zinc-500 text-xs">Sin conservantes ni filtrados industriales.</span>
              </div>
              <div>
                <span className="block text-[#D4AF37] font-bold text-lg">Espíritu Rebelde</span>
                <span className="text-zinc-500 text-xs">Recetas únicas nacidas del desvío.</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 2: BANNER INVITACIÓN AL FESTIVAL --- */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border border-[#D4AF37]/30 p-8 sm:p-12 text-center shadow-2xl">
          {/* Brillito ambiental dorado de fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[#D4AF37] text-4xl">🍻</span>
            
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-100 tracking-wide uppercase">
              La cerveza no solo se toma, <br />
              <span className="text-[#D4AF37]">se celebra.</span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg italic font-light">
              &quot;Te invito a conocernos en nuestro templo. Queremos compartir nuestra pasión, la música en vivo y las mejores pintas con vos.&quot;
            </p>

            <div className="pt-4">
              <Link
                href="/festival"
                className="inline-flex items-center gap-2 py-3.5 px-8 bg-[#D4AF37] hover:bg-[#b8972e] text-zinc-950 font-bold uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Conocé el Festival</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}