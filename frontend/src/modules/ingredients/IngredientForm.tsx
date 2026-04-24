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
import { Ingredient } from "../../types/Ingredient";

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

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Ingredientes</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditing(null);
            setIsOpen(true);
          }}
        >
          Nuevo Ingrediente
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredients?.map((ing) => (
            <tr key={ing.id}>
              <td className="border p-2">{ing.id}</td>
              <td className="border p-2">{ing.name}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setEditing(ing);
                    setIsOpen(true);
                  }}
                >
                  Editar
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteMutation.mutate(ing.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <IngredientForm initialData={editing || undefined} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
