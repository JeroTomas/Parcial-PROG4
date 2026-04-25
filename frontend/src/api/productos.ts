import { apiClient } from "./apiClient";
import type { Producto } from "../types";

export const getProductos = async (): Promise<Producto[]> => {
  const response = await apiClient.get<Producto[]>("/products/");
  return response.data;
};

export const createProducto = async (data: Omit<Producto, "id">): Promise<Producto> => {
  const response = await apiClient.post<Producto>("/products/", data);
  return response.data;
};

export const updateProducto = async (id: number, data: Omit<Producto, "id">): Promise<Producto> => {
  const response = await apiClient.put<Producto>(`/products/${id}`, data);
  return response.data;
};

export const deleteProducto = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};
