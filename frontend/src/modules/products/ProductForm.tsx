import { useState, useEffect } from "react";
import type { Product, ProductCreate } from "../../types/Product.ts";
import type { Category } from "../../types/Category.ts";
import type { Ingredient } from "../../types/Ingredient.ts";

interface Props {
  initialData?: Product;
  categories: Category[];
  ingredients: Ingredient[];
  onSubmit: (data: ProductCreate) => void;
}

export default function ProductForm({
  initialData,
  categories,
  ingredients,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setCategoryId(initialData.category_id);
      setSelectedIngredients(initialData.ingredients);
    }
  }, [initialData]);

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      price,
      category_id: categoryId,
      ingredients: selectedIngredients,
    });
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

      <div>
        <label className="block text-sm font-medium">Precio</label>
        <input
          type="number"
          className="border rounded w-full p-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Categoría</label>
        <select
          className="border rounded w-full p-2"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          <option value="">Seleccionar...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Ingredientes</label>
        <div className="flex flex-col gap-1 border p-2 rounded">
          {ingredients.map((ing) => (
            <label key={ing.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ing.id)}
                onChange={() => toggleIngredient(ing.id)}
              />
              {ing.name}
            </label>
          ))}
        </div>
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
