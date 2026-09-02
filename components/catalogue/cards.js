'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function BeerCard({ id, name, style, price, ibu, abv, srm, description, imageUrl }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(
      {
        id: id || name.toLowerCase().replace(/\s+/g, '-'),
        name,
        price: price || 0,
        image: imageUrl,
        style,
      },
      quantity
    );
    
    // Reinicia el contador a 1 tras agregar
    setQuantity(1);
  };

  return (
    <div className="bg-[#1c1c1c] border border-[#F2A21B] rounded-lg p-5 max-w-[300px] m-2.5 text-white font-sans flex flex-col items-center text-center shadow-xl">
      
      {/* Contenedor de la Imagen */}
      <div className="relative w-24 h-36 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-[#F2A21B] text-2xl font-santo-alt font-bold mb-1 uppercase tracking-wider">
        {name}
      </h3>
      
      <p className="text-sm text-gray-300 mb-2 font-medium">{style}</p>
      
      {price && (
        <span className="text-xl font-bold text-white mb-3">
          ${price.toLocaleString('es-AR')}
        </span>
      )}

      {/* Estadísticas de la Cerveza */}
      <div className="flex justify-around w-full py-2 my-2 text-xs border-y border-gray-700 text-gray-300">
        <span>IBU: {ibu}</span>
        <span>ABV: {abv}%</span>
        <span>SRM: {srm}</span>
      </div>

      <p className="text-xs text-gray-400 my-3 flex-grow leading-relaxed">
        {description}
      </p>

      {/* Selector de Cantidad */}
      <div className="flex items-center justify-between w-full mb-3 bg-[#121212] border border-[#F2A21B]/40 rounded p-1">
        <button
          onClick={handleDecrement}
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-[#1c1c1c] text-[#F2A21B] hover:bg-[#F2A21B] hover:text-[#121212] font-bold rounded transition-colors"
        >
          -
        </button>
        <span className="font-bold text-white text-sm select-none">
          {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
        </span>
        <button
          onClick={handleIncrement}
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-[#1c1c1c] text-[#F2A21B] hover:bg-[#F2A21B] hover:text-[#121212] font-bold rounded transition-colors"
        >
          +
        </button>
      </div>

      {/* Botón interactivo vinculado al CartContext */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt font-bold uppercase py-2 px-4 rounded border-2 border-[#F2A21B] transition-all transform hover:scale-105 active:scale-95 shadow-md"
      >
        Pedir ahora
      </button>
    </div>
  );
}