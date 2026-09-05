export default function FestivalFormUI({ formData, onChange, onSubmit, loading, quantity = 1, onQuantityChange }) {
  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="border-2 border-[#F2A21B] bg-[#121212] p-8 relative shadow-2xl">
        <h2 className="font-santo-display text-3xl md:text-5xl text-[#F2A21B] text-center mb-2 uppercase rotate-[-1deg]">
          SANTO DESVÍO FESTIVAL
        </h2>
        <p className="font-santo-alt text-lg text-center text-[#F0EDE4] tracking-wider uppercase mb-8">
          Inscribite y asegura tu entrada al infierno
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={onChange}
                className="w-full bg-[#010101] border-2 border-[#F2A21B] p-3 text-[#F0EDE4] font-santo-body focus:outline-none focus:ring-1 focus:ring-[#F2A21B]"
                placeholder="Juan"
              />
            </div>
            <div>
              <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={onChange}
                className="w-full bg-[#010101] border-2 border-[#F2A21B] p-3 text-[#F0EDE4] font-santo-body focus:outline-none focus:ring-1 focus:ring-[#F2A21B]"
                placeholder="Pérez"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
                DNI
              </label>
              <input
                type="text"
                name="dni"
                required
                value={formData.dni}
                onChange={onChange}
                className="w-full bg-[#010101] border-2 border-[#F2A21B] p-3 text-[#F0EDE4] font-santo-body focus:outline-none focus:ring-1 focus:ring-[#F2A21B]"
                placeholder="12345678"
              />
            </div>
            <div>
              <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={onChange}
                className="w-full bg-[#010101] border-2 border-[#F2A21B] p-3 text-[#F0EDE4] font-santo-body focus:outline-none focus:ring-1 focus:ring-[#F2A21B]"
                placeholder="tuemail@ejemplo.com"
              />
            </div>
          </div>

          {/* Selector de Cantidad de Entradas */}
          <div className="flex flex-col items-center justify-center pt-2">
            <label className="block font-santo-alt text-[#F2A21B] tracking-wider uppercase mb-2">
              Cantidad de Entradas ($150 c/u)
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onQuantityChange && onQuantityChange(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-[#010101] border-2 border-[#F2A21B] text-[#F2A21B] font-bold text-xl hover:bg-[#F2A21B] hover:text-[#010101] transition-colors"
              >
                -
              </button>
              <span className="font-santo-alt text-2xl text-[#F0EDE4] min-w-[30px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange && onQuantityChange(quantity + 1)}
                className="w-10 h-10 bg-[#010101] border-2 border-[#F2A21B] text-[#F2A21B] font-bold text-xl hover:bg-[#F2A21B] hover:text-[#010101] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F2A21B] text-[#010101] font-santo-alt text-2xl py-4 uppercase font-bold tracking-widest hover:bg-[#F0EDE4] transition-colors disabled:opacity-50"
            >
              🛒 AGREGAR AL CARRITO (${(150 * quantity).toLocaleString('es-AR')})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}