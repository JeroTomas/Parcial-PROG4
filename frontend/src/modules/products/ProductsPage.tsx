import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";
import { getCategories } from "../../api/categories";
import { getIngredients } from "../../api/ingredients";
import ProductForm from "./ProductForm";
import Modal from "../../components/ui/Modal";
import type { Product } from "../../types/Product.ts";

export default function ProductsPage() {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: ingredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const handleSubmit = (data: any) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }
    setIsOpen(false);
    setEditing(null);
  };

  if (isLoading || !categories || !ingredients)
    return <p className="p-6 text-gray-600">Cargando...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7f1d1d]">Productos</h1>
          <p className="text-gray-600 mt-1">
            Gestioná todos los productos del menú desde un solo lugar.
          </p>
        </div>

        <button
          className="px-5 py-2 rounded-lg bg-[#1d4ed8] text-white font-medium hover:bg-[#153ea8] transition"
          onClick={() => {
            setEditing(null);
            setIsOpen(true);
          }}
        >
          Nuevo Producto
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Ingredientes</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((prod) => (
              <tr
                key={prod.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{prod.id}</td>
                <td className="p-3">{prod.name}</td>
                <td className="p-3">${prod.price}</td>
                <td className="p-3">
                  {categories.find((c) => c.id === prod.category_id)?.name}
                </td>
                <td className="p-3">
                  {prod.ingredients
                    .map((id) => ingredients.find((i) => i.id === id)?.name)
                    .join(", ")}
                </td>

                <td className="p-3 flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 rounded bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition"
                    onClick={() => {
                      setEditing(prod);
                      setIsOpen(true);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="px-3 py-1 rounded bg-[#7f1d1d] text-white hover:bg-[#5f1414] transition"
                    onClick={() => deleteMutation.mutate(prod.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ProductForm
          initialData={editing || undefined}
          categories={categories}
          ingredients={ingredients}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
