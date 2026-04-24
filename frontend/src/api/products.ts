import axios from "axios";
import { Product, ProductCreate } from "../types/Product";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products/");
  return res.data;
};

export const createProduct = async (data: ProductCreate): Promise<Product> => {
  const res = await api.post("/products/", data);
  return res.data;
};

export const updateProduct = async (id: number, data: ProductCreate): Promise<Product> => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
