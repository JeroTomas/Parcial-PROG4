import { useState, useEffect } from "react";
import type { Ingredient, IngredientCreate } from "../../types/Ingredient.ts";

interface Props {
  initialData?: Ingredient;
  onSubmit: (data: IngredientCreate) => void;
}

export default function IngredientForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          className="border rounded w-full p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
}
