'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// Recupera el precio base desde el archivo .env (con fallback por seguridad)
const BASE_PRICE = Number(process.env.NEXT_PUBLIC_TICKET_PRICE) || 30000;

export default function EntradasForm() {
  const { addToCart } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // Porcentaje devuelto por la API (0, 25 o 50)
  const [activeCode, setActiveCode] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', text: '' });

  // Cálculo dinámico de precio por entrada y total acumulado
  const unitPrice = BASE_PRICE * (1 - appliedDiscount / 100);
  const totalPrice = unitPrice * quantity;

  // Validar código contra la API interna
  const handleApplyDiscount = async () => {
    if (!discountCodeInput.trim()) return;

    setLoadingCode(true);
    setFeedbackMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCodeInput }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setAppliedDiscount(data.discountPercentage);
        setActiveCode(data.appliedCode);
        setFeedbackMessage({
          type: 'success',
          text: `¡Descuento del ${data.discountPercentage}% aplicado correctamente!`,
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          text: data.message || 'Código de descuento no válido.',
        });
      }
    } catch (err) {
      setFeedbackMessage({
        type: 'error',
        text: 'Error al verificar el código. Intenta de nuevo.',
      });
    } finally {
      setLoadingCode(false);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    const ticketItem = {
      id: 'ticket-festival-santo-desvio',
      name: 'Entrada Santo Desvío Festival Vol. I',
      price: unitPrice,
      originalPrice: BASE_PRICE,
      appliedDiscountCode: activeCode || null,
      discountPercentage: appliedDiscount,
      image: '/FESTIVAL.jpeg',
    };

    addToCart(ticketItem, quantity);
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
          {/* Selector de Cantidad */}
          <div className="flex flex-col items-center justify-center pt-2">
            <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
              Cantidad de Entradas (${unitPrice.toLocaleString('es-AR')} c/u)
              {appliedDiscount > 0 && (
                <span className="line-through text-gray-500 text-sm ml-2">
                  ${BASE_PRICE.toLocaleString('es-AR')}
                </span>
              )}
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-[#010101] border-2 border-[#F2A21B] text-[#F2A21B] font-bold text-xl hover:bg-[#F2A21B] hover:text-[#010101] cursor-pointer"
              >
                -
              </button>
              <span className="font-santo-alt text-2xl text-[#F0EDE4] min-w-[30px]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-[#010101] border-2 border-[#F2A21B] text-[#F2A21B] font-bold text-xl hover:bg-[#F2A21B] hover:text-[#010101] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Campo Código de Descuento */}
          <div className="border-t border-[#F2A21B]/30 pt-6">
            <label className="block font-santo-alt text-[#F0EDE4] text-sm uppercase tracking-wider mb-2">
              ¿Tenés un código de descuento?
            </label>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={discountCodeInput}
                onChange={(e) => setDiscountCodeInput(e.target.value)}
                placeholder="Ingresá tu código"
                disabled={appliedDiscount > 0}
                className="flex-1 bg-[#010101] border border-[#F2A21B] text-[#F0EDE4] px-4 py-2 uppercase font-mono tracking-widest text-center focus:outline-none focus:border-yellow-400 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={loadingCode || appliedDiscount > 0}
                className="bg-[#F2A21B] text-[#010101] font-bold px-4 py-2 uppercase font-santo-alt hover:bg-[#F0EDE4] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loadingCode ? '...' : 'Aplicar'}
              </button>
            </div>

            {/* Mensaje de confirmación/error */}
            {feedbackMessage.text && (
              <p
                className={`mt-2 text-sm font-santo-alt ${
                  feedbackMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {feedbackMessage.text}
              </p>
            )}
          </div>

          {/* Botón Principal */}
          <button
            type="submit"
            className="w-full bg-[#F2A21B] text-[#010101] font-santo-alt text-2xl py-4 uppercase font-bold tracking-widest hover:bg-[#F0EDE4] transition-colors cursor-pointer"
          >
            🛒 AGREGAR AL CARRITO (${totalPrice.toLocaleString('es-AR')})
          </button>
        </form>
      </div>
    </div>
  );
}