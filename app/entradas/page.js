'use client';

import { useState } from 'react';
import FestivalFormUI from '@/components/Festival/FormUI';

export default function PageEntradas() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleComprarEntrada = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Armamos el payload estructurado exactamente como lo espera checkout/route.js
      const payload = {
        items: [
          {
            id: 'ticket-festival-santo-desvio',
            name: 'Entrada Santo Desvío Festival Vol. I',
            price: 15000,
            quantity: 1,
            image: '/FESTIVAL.jpeg',
          },
        ],
        payer: {
          name: formData.name,
          lastName: formData.lastName,
          dni: formData.dni,
          email: formData.email,
          phone: formData.phone || '',
        },
      };

      // 2. Enviamos la petición directamente a la pasarela
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.init_point) {
        // Redirigimos directamente al checkout de Mercado Pago
        window.location.href = data.init_point;
      } else {
        alert(data.error || 'Ocurrió un error al conectar con MercadoPago');
      }
    } catch (error) {
      console.error('Error procesando entrada:', error);
      alert('Ocurrió un error al conectar con MercadoPago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FestivalFormUI
      formData={formData}
      onChange={handleChange}
      onSubmit={handleComprarEntrada}
      loading={loading}
    />
  );
}