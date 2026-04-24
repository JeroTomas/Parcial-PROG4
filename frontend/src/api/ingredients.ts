import axios from "axios";
import { Ingredient, IngredientCreate } from "../types/Ingredient";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await api.get("/ingredients/");
  return res.data;
};

export const createIngredient = async (data: IngredientCreate): Promise<Ingredient> => {
  const res = await api.post("/ingredients/", data);
  return res.data;
};

export const updateIngredient = async (id: number, data: IngredientCreate): Promise<Ingredient> => {
  const res = await api.put(`/ingredients/${id}`, data);
  return res.data;
};

export const deleteIngredient = async (id: number): Promise<void> => {
  await api.delete(`/ingredients/${id}`);
};
