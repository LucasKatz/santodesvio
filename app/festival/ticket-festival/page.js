'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/UserInt/navbar';
import Footer from '@/components/UserInt/footer';
import TicketCardUI from '@/components/Festival/TicketCard';
import { generateQRCode, generateTicketCode } from '@/app/services/ticketService';

function TicketContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('status');

  const [ticketData, setTicketData] = useState({ code: '', qr: '' });

  useEffect(() => {
    if (paymentStatus === 'approved' || searchParams.get('collection_status') === 'approved') {
      const code = generateTicketCode();
      generateQRCode(code).then((qr) => {
        setTicketData({ code, qr });
      });
    }
  }, [searchParams, paymentStatus]);

  if (paymentStatus !== 'approved' && searchParams.get('collection_status') !== 'approved') {
    return (
      <div className="text-center text-[#F0EDE4] font-santo-alt my-20">
        <h2 className="text-3xl text-red-500">PAGO NO COMPLETADO</h2>
        <p className="mt-2">No pudimos procesar tu acreditación.</p>
      </div>
    );
  }

  return (
    <TicketCardUI 
      ticketCode={ticketData.code} 
      qrDataUrl={ticketData.qr} 
      userData={{
        name: searchParams.get('external_reference') || 'Asistente',
        lastName: '',
        dni: 'Acreditado',
      }} 
    />
  );
}

export default function TicketPage() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col justify-between">
      <Navbar />
      <Suspense fallback={<div className="text-center text-[#F2A21B] my-20 font-santo-alt">Cargando entrada...</div>}>
        <TicketContent />
      </Suspense>
      <Footer />
    </main>
  );
}