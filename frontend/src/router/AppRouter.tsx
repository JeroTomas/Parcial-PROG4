import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../modules/home/HomePage";
import ProductsPage from "../modules/products/ProductsPage";
import CategoriesPage from "../modules/categories/CategoriesPage";
import IngredientsPage from "../modules/ingredients/IngredientsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
