import { apiClient } from "./apiClient";
import type { Categoria } from "../types";

export const getCategorias = async (): Promise<Categoria[]> => {
  const { data } = await apiClient.get<Categoria[]>("/categories/");
  return data;
};

export const createCategoria = async (name: string, parent_id?: number | null): Promise<Categoria> => {
  const response = await apiClient.post<Categoria>("/categories/", { name, parent_id: parent_id ?? null });
  return response.data;
};

export const updateCategoria = async (id: number, name: string, parent_id?: number | null): Promise<Categoria> => {
  const response = await apiClient.put<Categoria>(`/categories/${id}`, { name, parent_id: parent_id ?? null });
  return response.data;
};

export const deleteCategoria = async (id: number): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};
