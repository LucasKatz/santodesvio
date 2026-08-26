'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/services/contactService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus({
        loading: false,
        success: true,
        message: '¡Tu consulta ha sido enviada con éxito! Te responderemos a la brevedad.',
      });
      setFormData({ name: '', lastName: '', email: '', phone: '', message: '' });
    } else {
      setStatus({
        loading: false,
        success: false,
        message: 'Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-zinc-950 border border-[#D4AF37]/30 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-2 tracking-wide uppercase">
        Contacto
      </h2>
      <p className="text-zinc-400 text-center text-sm mb-6">
        ¿Tienes dudas sobre el Santo Desvío Festival? Escríbenos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Juan"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ej. Pérez"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
              N° de Contacto
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="11 1234 5678"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
            Consulta
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe aquí tu mensaje o consulta..."
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full py-3 px-6 bg-[#D4AF37] hover:bg-[#b8972e] text-zinc-950 font-bold uppercase tracking-wider rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#D4AF37]/10"
        >
          {status.loading ? 'Enviando...' : 'Enviar Consulta'}
        </button>

        {status.message && (
          <div
            className={`p-3 rounded-lg text-sm text-center border ${
              status.success
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-400'
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}