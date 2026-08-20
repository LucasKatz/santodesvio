'use client';

import { useState } from 'react';
import Navbar from '@/components/UserInt/navbar';
import Footer from '@/components/UserInt/footer';
import FestivalFormUI from '@/components/Festival/FormUI';

export default function FestivalPage() {
  const [formData, setFormData] = useState({ name: '', lastName: '', dni: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point; // Redirección a MercadoPago
      }
    } catch (err) {
      alert('Ocurrió un error al conectar con MercadoPago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] flex flex-col justify-between">
      <Navbar />
      <FestivalFormUI 
        formData={formData} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
      <Footer />
    </main>
  );
}