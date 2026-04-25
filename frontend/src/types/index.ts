export interface Categoria {
  id: number;
  name: string;
  parent_id?: number | null;
}

export interface Ingrediente {
  id: number;
  name: string;
  description?: string;
}

export interface Producto {
  id: number;
  name: string;
  price: number;
  category_id: number;
  image_url?: string;
  description?: string;
  ingredients: number[];
}
