import { fetchApi } from "./apiClient";
import type { Producto } from "../types";

export const getProductos = async (): Promise<Producto[]> => {
  return fetchApi<Producto[]>("/products/");
};

export const createProducto = async (data: Omit<Producto, "id">): Promise<Producto> => {
  return fetchApi<Producto>("/products/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProducto = async (id: number, data: Omit<Producto, "id">): Promise<Producto> => {
  return fetchApi<Producto>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteProducto = async (id: number): Promise<void> => {
  return fetchApi<void>(`/products/${id}`, { method: "DELETE" });
};
