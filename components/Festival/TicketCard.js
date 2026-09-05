import Image from 'next/image';

export default function TicketCardUI({ ticketCode, userData }) {
  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="border-4 border-[#F2A21B] bg-[#121212] p-6 text-center relative shadow-2xl">
        <h2 className="font-santo-display text-3xl text-[#F2A21B] uppercase mb-1">
          SANTO DESVÍO FEST
        </h2>
        <p className="font-santo-alt text-[#F0EDE4] text-sm tracking-widest uppercase mb-6">
          Pase Oficial de Acceso
        </p>

        {/* CÓDIGO ÚNICO EN TEXTO PLANO */}
        <div className="bg-[#010101] border-2 border-[#F2A21B] p-4 mb-6">
          <span className="block text-[#F2A21B] font-santo-alt text-xs uppercase tracking-widest mb-1">
            Código de Entrada
          </span>
          <span className="font-mono text-2xl text-[#F0EDE4] font-bold tracking-wider select-all">
            {ticketCode}
          </span>
        </div>

        <div className="text-left font-santo-body text-sm text-[#F0EDE4] space-y-2 border-t border-[#F2A21B]/40 pt-4">
          <p><strong className="text-[#F2A21B]">Titular:</strong> {userData?.name} {userData?.lastName}</p>
          <p><strong className="text-[#F2A21B]">DNI:</strong> {userData?.dni}</p>
          <p><strong className="text-[#F2A21B]">Estado:</strong> PAGADO / CONFIRMADO</p>
        </div>
      </div>
    </div>
  );
}