import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="bg-santo-black border-4 border-santo-ochre rounded-2xl p-6 flex flex-col items-center text-center space-y-4 shadow-2xl hover:shadow-[0_0_30px_rgba(242,162,27,0.4)] transition-shadow">
      <div className="w-full h-56 relative">
        <Image 
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-2 flex-grow">
        <span className="text-santo-ochre font-santo-alt text-xs uppercase px-3 py-1 border border-santo-ochre rounded-full inline-block">
          {product.style} • {product.abv}
        </span>
        <h4 className="font-santo-alt text-2xl text-santo-white pt-2">{product.name}</h4>
        <p className="text-santo-white/70 text-sm font-santo-body">{product.tagline}</p>
      </div>
      <div className="w-full pt-4 flex items-center justify-between border-t border-santo-ochre/30">
        <span className="font-santo-alt text-3xl text-santo-ochre">{product.price}</span>
        <button className="bg-santo-ochre text-santo-black px-5 py-2 rounded-lg font-santo-alt text-lg hover:bg-santo-white transition-colors font-bold uppercase">
          Añadir
        </button>
      </div>
    </div>
  );
}