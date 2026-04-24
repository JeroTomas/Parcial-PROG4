import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categories";
import CategoryForm from "./CategoryForm";
import Modal from "../../components/ui/Modal";
import type { Category } from "../../types/Category.ts";

export default function CategoriesPage() {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string } }) =>
      updateCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const handleSubmit = (data: { name: string }) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }
    setIsOpen(false);
    setEditing(null);
  };

  if (isLoading)
    return <p className="p-6 text-gray-600">Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7f1d1d]">Categorías</h1>
          <p className="text-gray-600 mt-1">
            Administrá las categorías disponibles en el menú.
          </p>
        </div>

        <button
          className="px-5 py-2 rounded-lg bg-[#1d4ed8] text-white font-medium hover:bg-[#153ea8] transition"
          onClick={() => {
            setEditing(null);
            setIsOpen(true);
          }}
        >
          Nueva Categoría
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((cat) => (
              <tr
                key={cat.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{cat.id}</td>
                <td className="p-3">{cat.name}</td>

                <td className="p-3 flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 rounded bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition"
                    onClick={() => {
                      setEditing(cat);
                      setIsOpen(true);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="px-3 py-1 rounded bg-[#7f1d1d] text-white hover:bg-[#5f1414] transition"
                    onClick={() => deleteMutation.mutate(cat.id)}
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
        <CategoryForm
          initialData={editing || undefined}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
