import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../api/ingredients";
import IngredientForm from "./IngredientForm";
import Modal from "../../components/ui/Modal";
import type { Ingredient } from "../../types/Ingredient.ts";

export default function IngredientsPage() {
  const queryClient = useQueryClient();

  const { data: ingredients, isLoading } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Ingredient | null>(null);

  const createMutation = useMutation({
    mutationFn: createIngredient,
    onSuccess: () => queryClient.invalidateQueries(["ingredients"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string } }) =>
      updateIngredient(id, data),
    onSuccess: () => queryClient.invalidateQueries(["ingredients"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIngredient,
    onSuccess: () => queryClient.invalidateQueries(["ingredients"]),
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
          <h1 className="text-3xl font-bold text-[#7f1d1d]">Ingredientes</h1>
          <p className="text-gray-600 mt-1">
            Administrá los ingredientes disponibles para los productos.
          </p>
        </div>

        <button
          className="px-5 py-2 rounded-lg bg-[#1d4ed8] text-white font-medium hover:bg-[#153ea8] transition"
          onClick={() => {
            setEditing(null);
            setIsOpen(true);
          }}
        >
          Nuevo Ingrediente
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
            {ingredients?.map((ing) => (
              <tr
                key={ing.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{ing.id}</td>
                <td className="p-3">{ing.name}</td>

                <td className="p-3 flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 rounded bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition"
                    onClick={() => {
                      setEditing(ing);
                      setIsOpen(true);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="px-3 py-1 rounded bg-[#7f1d1d] text-white hover:bg-[#5f1414] transition"
                    onClick={() => deleteMutation.mutate(ing.id)}
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
        <IngredientForm
          initialData={editing || undefined}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
