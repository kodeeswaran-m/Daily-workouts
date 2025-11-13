import type { Product } from "./product.js";
import type User from "./user.js";

export interface Order {
  id: number;
  user: User;
  products: Product[];
  total: number;
  date: Date;
}
