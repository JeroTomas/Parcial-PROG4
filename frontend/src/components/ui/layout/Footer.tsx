export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LEFT */}
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Gestión de Menú — Todos los derechos reservados.
        </p>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="/products"
            className="text-gray-700 hover:text-[#1d4ed8] transition"
          >
            Productos
          </a>
          <a
            href="/categories"
            className="text-gray-700 hover:text-[#0ea5e9] transition"
          >
            Categorías
          </a>
          <a
            href="/ingredients"
            className="text-gray-700 hover:text-[#7f1d1d] transition"
          >
            Ingredientes
          </a>
        </div>
      </div>
    </footer>
  );
}
