import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Festival | Santo Desvío - Fiesta de Cerveza Artesanal',
  description: 'Conoce los detalles del Santo Desvío Festival Vol. I y adquiere tus entradas.',
};

export default function FestivalPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center py-10 px-4">
      {/* Indicador superior sutil */}
      <p className="text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 animate-pulse">
        Haz clic en el flyer para comprar tus entradas
      </p>

      {/* Tarjeta interactiva del flyer */}
      <div className="relative group max-w-lg w-full">
        <Link href="/entradas" className="block relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.35)]">
          
          <Image
            src="/FESTIVAL.jpeg"
            alt="Santo Desvío Festival Vol. I - Fiesta de Cerveza Artesanal"
            width={700}
            height={1050}
            priority
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />

          {/* Overlay dorado al hacer hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <span className="bg-[#D4AF37] text-zinc-950 font-bold uppercase tracking-wider py-3 px-8 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm sm:text-base">
              🎟️ Comprar Entradas
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}