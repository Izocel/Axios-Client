import { ProductData } from "./ProductData";

export interface CartData {
  id: number;
  userId: number;
  date: string;
  products: ProductData[];
}
