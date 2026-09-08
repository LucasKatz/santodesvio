'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function MerchCard({ id, name, type, price, description, imageUrl, variants }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(variants && variants.length > 0 ? variants[0] : '');

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(
      {
        id: selectedVariant ? `${id}-${selectedVariant.toLowerCase()}` : id,
        name: selectedVariant && variants?.length > 1 ? `${name} (${selectedVariant})` : name,
        price: price || 0,
        image: imageUrl,
        style: type,
      },
      quantity
    );

    setQuantity(1);
  };

  return (
    <div className="bg-[#1c1c1c] border border-[#F2A21B] rounded-lg p-4 w-full max-w-[220px] m-3 text-white font-sans flex flex-col items-center text-center shadow-xl">
      
      {/* Contenedor de la Imagen (Sin neón ni resplandor) */}
      <div className="group relative w-full h-64 mb-4 rounded-md overflow-hidden cursor-pointer border border-[#F2A21B]/30 transition-all duration-300 hover:border-[#F2A21B]">
        <Image
          src={imageUrl || '/logo2.png'}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay con la Descripción en Hover (Plano, sin brillos) */}
        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 border-2 border-[#F2A21B]">
          <p 
            className="text-[#F2A21B] text-sm leading-relaxed text-center uppercase tracking-wide"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Nombre y Tipo */}
      <h3 className="text-[#F2A21B] text-xl font-santo-alt font-bold mb-1 uppercase tracking-wider">
        {name}
      </h3>
      
      <p className="text-xs text-gray-300 mb-3 font-medium">{type}</p>
      
      {price && (
        <span className="text-lg font-bold text-white mb-4">
          ${price.toLocaleString('es-AR')}
        </span>
      )}

      {/* Selector de Variante/Talle si aplica */}
      {variants && variants.length > 1 && (
        <div className="w-full mb-3">
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full bg-[#121212] text-white border border-[#F2A21B]/50 rounded text-xs p-1.5 focus:outline-none focus:border-[#F2A21B]"
          >
            {variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selector de Cantidad */}
      <div className="flex items-center justify-between w-full mb-3 bg-[#121212] border border-[#F2A21B]/40 rounded p-1 mt-auto">
        <button
          onClick={handleDecrement}
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-[#1c1c1c] text-[#F2A21B] hover:bg-[#F2A21B] hover:text-[#121212] font-bold rounded transition-colors"
        >
          -
        </button>
        <span className="font-bold text-white text-xs select-none">
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

      {/* Botón interactivo */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt font-bold uppercase py-2 px-3 text-sm rounded border-2 border-[#F2A21B] transition-all transform hover:scale-105 active:scale-95 shadow-md"
      >
        Pedir ahora
      </button>
    </div>
  );
}