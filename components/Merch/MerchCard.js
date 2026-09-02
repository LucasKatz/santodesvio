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
        style: type, // Reutilizamos 'style' para mostrar la categoría o tipo en el carrito
      },
      quantity
    );

    setQuantity(1);
  };

  return (
    <div className="bg-[#1c1c1c] border border-[#F2A21B] rounded-lg p-5 max-w-[300px] m-2.5 text-white font-sans flex flex-col items-center text-center shadow-xl">
      
      {/* Contenedor de la Imagen */}
      <div className="relative w-36 h-36 mb-4">
        <Image
          src={imageUrl || '/logo2.png'}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      {/* Nombre y Tipo de Producto */}
      <h3 className="text-[#F2A21B] text-2xl font-santo-alt font-bold mb-1 uppercase tracking-wider">
        {name}
      </h3>
      
      <p className="text-xs text-gray-400 mb-2 font-medium tracking-wide uppercase">{type}</p>
      
      {price && (
        <span className="text-2xl font-bold text-white mb-3">
          ${price.toLocaleString('es-AR')}
        </span>
      )}

      {/* Selector de Variante/Talle si existe más de una */}
      {variants && variants.length > 1 && (
        <div className="w-full mb-3">
          <label className="text-xs text-gray-400 block mb-1">Seleccionar Variante:</label>
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

      {/* Descripción */}
      <p className="text-xs text-gray-300 my-2 flex-grow leading-relaxed">
        {description}
      </p>

      {/* Selector de Cantidad */}
      <div className="flex items-center justify-between w-full my-3 bg-[#121212] border border-[#F2A21B]/40 rounded p-1">
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

      {/* Botón interactivo de Compra */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt font-bold uppercase py-2 px-4 rounded border-2 border-[#F2A21B] transition-all transform hover:scale-105 active:scale-95 shadow-md"
      >
        Agregar al Carrito
      </button>
    </div>
  );
}