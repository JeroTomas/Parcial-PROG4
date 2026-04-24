import axios from "axios";
import type { Category, CategoryCreate } from "../types/Category.ts";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories/");
  return res.data;
};

export const createCategory = async (data: CategoryCreate): Promise<Category> => {
  const res = await api.post("/categories/", data);
  return res.data;
};

export const updateCategory = async (id: number, data: CategoryCreate): Promise<Category> => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
