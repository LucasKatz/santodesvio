'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PageEntradas() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();

    const ticketItem = {
      id: 'ticket-festival-santo-desvio',
      name: 'Entrada Santo Desvío Festival Vol. I',
      price: 150,
      image: '/FESTIVAL.jpeg',
    };

    // Agrega la cantidad exacta al carrito común
    addToCart(ticketItem, quantity);

    // Redirige al flujo estándar del carrito donde se completan los datos del pago
    router.push('/cart');
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="border-2 border-[#F2A21B] bg-[#121212] p-8 text-center relative shadow-2xl">
        <h2 className="font-santo-display text-3xl md:text-5xl text-[#F2A21B] mb-2 uppercase rotate-[-1deg]">
          SANTO DESVÍO FESTIVAL
        </h2>
        <p className="font-santo-alt text-lg text-[#F0EDE4] tracking-wider uppercase mb-8">
          Asegura tu entrada al infierno
        </p>

        <form onSubmit={handleAddToCart} className="space-y-6">
          <div className="flex flex-col items-center justify-center pt-2">
            <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
              Cantidad de Entradas ($15.000 c/u)
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-[#010101] border-2 border-[#F2A21B] text-[#F2A21B] font-bold text-xl hover:bg-[#F2A21B] hover:text-[#010101]"
              >
                -
              </button>
              <span className="font-santo-alt text-2xl text-[#F0EDE4] min-w-[30px]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-[#010101] border-2 border-[#F2A21B] text-[#F2A21B] font-bold text-xl hover:bg-[#F2A21B] hover:text-[#010101]"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F2A21B] text-[#010101] font-santo-alt text-2xl py-4 uppercase font-bold tracking-widest hover:bg-[#F0EDE4] transition-colors"
          >
            🛒 AGREGAR AL CARRITO (${(15000 * quantity).toLocaleString('es-AR')})
          </button>
        </form>
      </div>
    </div>
  );
}