import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import CategoriasPage from "../pages/CategoriasPage";
import IngredientesPage from "../pages/IngredientesPage";
import ProductosPage from "../pages/ProductosPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/categorias" replace />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="ingredientes" element={<IngredientesPage />} />
        <Route path="productos" element={<ProductosPage />} />
        <Route path="detalle/:id" element={<div className="p-8">Detalle del ítem</div>} />
      </Route>
    </Routes>
  );
};
