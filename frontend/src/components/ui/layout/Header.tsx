import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO / NOMBRE */}
        <Link to="/" className="text-2xl font-bold text-[#7f1d1d]">
          Gestión de Menú
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-[#1d4ed8]" : "text-gray-700 hover:text-[#1d4ed8]"
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-[#1d4ed8]" : "text-gray-700 hover:text-[#1d4ed8]"
              }`
            }
          >
            Productos
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-[#1d4ed8]" : "text-gray-700 hover:text-[#1d4ed8]"
              }`
            }
          >
            Categorías
          </NavLink>

          <NavLink
            to="/ingredients"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-[#1d4ed8]" : "text-gray-700 hover:text-[#1d4ed8]"
              }`
            }
          >
            Ingredientes
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
