export interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  ingredients: number[];
}

export interface ProductCreate {
  name: string;
  price: number;
  category_id: number;
  ingredients: number[];
}
