import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO IZQUIERDA */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Otero's Food"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* NAV DERECHA */}
        <nav className="flex gap-6 text-[#7f1d1d] font-medium">
          <Link to="/products" className="hover:text-[#1d4ed8] transition">Productos</Link>
          <Link to="/categories" className="hover:text-[#1d4ed8] transition">Categorías</Link>
          <Link to="/ingredients" className="hover:text-[#1d4ed8] transition">Ingredientes</Link>
        </nav>

      </div>
    </header>
  );
}
