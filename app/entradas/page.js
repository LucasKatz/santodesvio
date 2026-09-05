'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Ajusta la ruta a tu CartContext
import { useRouter } from 'next/navigation';
import FestivalFormUI from '@/components/Festival/FormUI';

export default function PageEntradas() {
  const { addToCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dni: '',
    email: '',
  });

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    // 1. Crear el ítem de la entrada con la cantidad seleccionada
    const ticketItem = {
      id: 'ticket-festival-santo-desvio',
      name: 'Entrada Santo Desvío Festival Vol. I',
      price: 15000,
      quantity: quantity,
      image: '/FESTIVAL.jpeg',
      payerData: formData, // Guardamos los datos del titular
    };

    // 2. Sumar al carrito global
    addToCart(ticketItem);

    // 3. Redirigir al carrito para continuar con el pago
    router.push('/cart');
  };

  return (
    <FestivalFormUI
      formData={formData}
      onChange={handleChange}
      onSubmit={handleAddToCart}
      quantity={quantity}
      onQuantityChange={setQuantity}
    />
  );
}