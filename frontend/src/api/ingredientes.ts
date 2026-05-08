import { fetchApi } from "./apiClient";
import type { Ingrediente } from "../types";

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  return fetchApi<Ingrediente[]>("/ingredients/");
};

export const createIngrediente = async (name: string, description?: string): Promise<Ingrediente> => {
  return fetchApi<Ingrediente>("/ingredients/", {
    method: "POST",
    body: JSON.stringify({ name, description }),
  });
};

export const updateIngrediente = async (id: number, name: string, description?: string): Promise<Ingrediente> => {
  return fetchApi<Ingrediente>(`/ingredients/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, description }),
  });
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  return fetchApi<void>(`/ingredients/${id}`, { method: "DELETE" });
};
