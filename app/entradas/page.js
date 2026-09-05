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

    const ticketItem = {
      id: 'ticket-festival-santo-desvio',
      name: 'Entrada Santo Desvío Festival Vol. I',
      price: 15000,
      image: '/FESTIVAL.jpeg',
      payerData: formData,
    };

    // Pasamos el ítem Y la cantidad real elegida en el selector
    addToCart(ticketItem, quantity);

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