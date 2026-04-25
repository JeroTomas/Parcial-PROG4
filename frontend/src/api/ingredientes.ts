import { apiClient } from "./apiClient";
import type { Ingrediente } from "../types";

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const response = await apiClient.get<Ingrediente[]>("/ingredients/");
  return response.data;
};

export const createIngrediente = async (name: string, description?: string): Promise<Ingrediente> => {
  const response = await apiClient.post<Ingrediente>("/ingredients/", { name, description });
  return response.data;
};

export const updateIngrediente = async (id: number, name: string, description?: string): Promise<Ingrediente> => {
  const response = await apiClient.put<Ingrediente>(`/ingredients/${id}`, { name, description });
  return response.data;
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  await apiClient.delete(`/ingredients/${id}`);
};
