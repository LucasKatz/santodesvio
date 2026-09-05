'use client';

import { useCart } from '@/context/CartContext'; // Ajusta la ruta a tu CartContext
import { useRouter } from 'next/navigation';

export default function FormularioEntradas() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleComprarEntrada = (e) => {
    e.preventDefault();

    // 1. Crear el objeto del ítem Entrada
    const ticketItem = {
      id: 'ticket-festival-santo-desvio',
      name: 'Entrada Santo Desvío Festival Vol. I',
      price: 5000, // Ajusta al precio real de la entrada
      quantity: 1, // O la cantidad seleccionada en el formulario
      image: '/FESTIVAL.jpeg',
    };

    // 2. Agregar al carrito
    addToCart(ticketItem);

    // 3. Redirigir al carrito para completar el flujo unificado
    router.push('/cart');
  };

  return (
    // Conserva todo tu JSX y tus clases de Tailwind exactamente igual
    <form onSubmit={handleComprarEntrada}>
      {/* Tus campos de formulario de entradas */}
      <button type="submit" className="bg-[#D4AF37] text-black font-bold py-3 px-8 rounded-full uppercase">
        🎟️ Comprar Entradas
      </button>
    </form>
  );
}