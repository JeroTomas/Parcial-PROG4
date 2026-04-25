import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname.startsWith(path);
    return `text-base font-medium transition-colors ${
      isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
    }`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#0ea5e9] rounded-full"></div>
            <h1 className="text-2xl font-black tracking-tight text-[#7f1d1d]">
              Otero's Food
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/categorias" className={getLinkClass("/categorias")}>Categorías</Link>
            <Link to="/productos" className={getLinkClass("/productos")}>Productos</Link>
            <Link to="/ingredientes" className={getLinkClass("/ingredientes")}>Ingredientes</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
