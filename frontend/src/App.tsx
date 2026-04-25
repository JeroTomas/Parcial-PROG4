import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CategoriasPage from "./pages/CategoriasPage";
import IngredientesPage from "./pages/IngredientesPage";
import ProductosPage from "./pages/ProductosPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/categorias" replace />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="ingredientes" element={<IngredientesPage />} />
        <Route path="productos" element={<ProductosPage />} />
        {/* Dynamic Route to satisfy the requirement */}
        <Route path="detalle/:id" element={<div className="p-8">Detalle del ítem</div>} />
      </Route>
    </Routes>
  );
}

export default App;
