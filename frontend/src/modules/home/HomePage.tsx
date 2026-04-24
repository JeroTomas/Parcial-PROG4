export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 gap-12">
        
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold text-[#7f1d1d] leading-tight">
            Gestión de Menú
          </h1>

          <p className="text-lg text-gray-700 max-w-md">
            Administra productos, categorías e ingredientes con una interfaz clara,
            moderna y optimizada para trabajar rápido y sin complicaciones.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/products"
              className="px-6 py-3 rounded-lg bg-[#1d4ed8] text-white font-medium hover:bg-[#153ea8] transition"
            >
              Ver Productos
            </a>

            <a
              href="/categories"
              className="px-6 py-3 rounded-lg bg-[#0ea5e9] text-white font-medium hover:bg-[#0284c7] transition"
            >
              Ver Categorías
            </a>

            <a
              href="/ingredients"
              className="px-6 py-3 rounded-lg bg-[#7f1d1d] text-white font-medium hover:bg-[#5f1414] transition"
            >
              Ver Ingredientes
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — TEMPORARY IMAGE */}
        <div className="flex-1 flex justify-center">
          <div className="w-80 h-80 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center text-gray-500">
            Imagen / Logo
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-16 pb-20">
        <div className="p-6 rounded-xl border shadow-sm text-center">
          <h3 className="text-2xl font-bold text-[#1d4ed8]">Rápido</h3>
          <p className="text-gray-600 mt-2">Interfaz optimizada para trabajar sin demoras.</p>
        </div>

        <div className="p-6 rounded-xl border shadow-sm text-center">
          <h3 className="text-2xl font-bold text-[#0ea5e9]">Organizado</h3>
          <p className="text-gray-600 mt-2">Todo el menú estructurado en un solo lugar.</p>
        </div>

        <div className="p-6 rounded-xl border shadow-sm text-center">
          <h3 className="text-2xl font-bold text-[#7f1d1d]">Flexible</h3>
          <p className="text-gray-600 mt-2">Relaciones entre productos, categorías e ingredientes.</p>
        </div>
      </section>
    </div>
  );
}
