import { fetchApi } from "./apiClient";
import type { Categoria } from "../types";

export const getCategorias = async (): Promise<Categoria[]> => {
  return fetchApi<Categoria[]>("/categories/");
};

export const createCategoria = async (name: string, parent_id?: number | null): Promise<Categoria> => {
  return fetchApi<Categoria>("/categories/", {
    method: "POST",
    body: JSON.stringify({ name, parent_id: parent_id ?? null }),
  });
};

export const updateCategoria = async (id: number, name: string, parent_id?: number | null): Promise<Categoria> => {
  return fetchApi<Categoria>(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, parent_id: parent_id ?? null }),
  });
};

export const deleteCategoria = async (id: number): Promise<void> => {
  return fetchApi<void>(`/categories/${id}`, { method: "DELETE" });
};
