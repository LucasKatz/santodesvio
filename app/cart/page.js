'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext'; // Ajusta la ruta a tu context

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  // Integración Checkout MercadoPago
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Redirige al checkout oficial de MercadoPago
        window.location.href = data.init_point;
      } else {
        alert('Hubo un error al generar la preferencia de pago.');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Ocurrió un error inesperado al conectar con MercadoPago.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-santo-alt text-3xl sm:text-5xl text-[#F2A21B] mb-6 uppercase tracking-wider">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          Parece que aún no has agregado ninguna birra para el camino.
        </p>
        <Link
          href="/birras"
          className="inline-block bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt font-bold uppercase px-8 py-3 rounded border-2 border-[#F2A21B] transition-all transform hover:scale-105"
        >
          Ir a las Birras
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-santo-alt text-3xl sm:text-5xl text-[#F2A21B] mb-8 uppercase tracking-wider text-center border-b-2 border-[#F2A21B] pb-4">
        Detalle de tu Carrito
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-[#1a1a1a] border border-[#F2A21B]/30 p-4 rounded gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 bg-[#121212] rounded border border-[#F2A21B]/50 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || '/logo2.png'}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-santo-alt text-lg text-white uppercase">{item.name}</h3>
                  {item.style && <p className="text-xs text-[#F2A21B]">{item.style}</p>}
                  <p className="text-gray-400 text-sm mt-1">${item.price.toLocaleString('es-AR')}</p>
                </div>
              </div>

              {/* Selector de cantidad y subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-800">
                <div className="flex items-center border border-[#F2A21B] rounded">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-[#F2A21B] hover:bg-[#F2A21B] hover:text-[#121212] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-white font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-[#F2A21B] hover:bg-[#F2A21B] hover:text-[#121212] transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-bold text-white">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 p-1"
                  title="Eliminar producto"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm text-gray-400 hover:text-red-400 underline transition-colors"
            >
              Vaciar Carrito
            </button>
            <Link href="/birras" className="text-xs sm:text-sm text-[#F2A21B] hover:underline">
              ← Seguir comprando
            </Link>
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="bg-[#1a1a1a] border-2 border-[#F2A21B] p-6 rounded h-fit">
          <h2 className="font-santo-alt text-2xl text-white uppercase mb-6 border-b border-gray-800 pb-2">
            Resumen
          </h2>

          <div className="space-y-3 text-sm text-gray-300 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className="text-xs text-gray-400">A calcular en la entrega</span>
            </div>
            <div className="border-t border-gray-800 pt-3 flex justify-between font-bold text-lg text-[#F2A21B]">
              <span>Total</span>
              <span>${totalPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-[#F2A21B] hover:bg-[#d48b12] text-[#121212] font-santo-alt font-bold uppercase py-3 rounded border-2 border-[#F2A21B] shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Pagar con MercadoPago'}
          </button>
        </div>
      </div>
    </div>
  );
}