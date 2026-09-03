'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ThanksPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Reducir la cuenta regresiva cada segundo
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirigir al inicio al llegar a los 5 segundos
    const redirectTimeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    // Limpiar temporizadores si el usuario sale antes
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="min-h-[80vh] bg-black text-[#F0EDE4] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full border-2 border-[#F2A21B] p-8 text-center relative bg-[#121212] shadow-2xl">
        
        {/* Ícono de Confirmación */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#F2A21B] flex items-center justify-center bg-black">
          <svg
            className="w-10 h-10 text-[#F2A21B]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        {/* Mensaje Principal */}
        <h1 className="text-3xl font-bold text-[#F2A21B] uppercase tracking-wider mb-4 font-santo-alt">
          ¡Gracias por tu compra!
        </h1>

        <p className="text-base text-[#F0EDE4] mb-6">
          Tu pedido ha sido procesado con éxito. En breve recibirás los detalles en tu correo electrónico.
        </p>

        {/* Contador de Redirección */}
        <div className="border-t border-b border-[#F2A21B]/30 py-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-[#F0EDE4]/80">
            Serás redirigido al inicio en
          </p>
          <span className="text-4xl font-bold text-[#F2A21B] block mt-1 font-mono">
            {countdown}
          </span>
        </div>

        {/* Botón Manual */}
        <Link
          href="/"
          className="inline-block w-full py-3 px-6 bg-[#F2A21B] text-black font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors duration-300 font-santo-alt"
        >
          Volver al Inicio Ahora
        </Link>
      </div>
    </div>
  );
}