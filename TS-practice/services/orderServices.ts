import type { Order } from "../models/order.js";
import type { Product } from "../models/product.js";
import type User from "../models/user.js";
import { applyDiscount, calculateTotal } from "../utils/productUtils.js";
import { updateStock } from "./productServices.js";

export const createOrder = (user: User, products: Product[]): Order => {
  // Update stock for each product
  products.forEach(product => updateStock(product.id, 1));

  const total = calculateTotal(products);
  const discountedTotal = applyDiscount(total, 10);

  const order: Order = {
    id: Math.floor(Math.random() * 10000),
    user,
    products,
    total: discountedTotal,
    date: new Date()
  };

  console.log("Order created successfully.");
  return order;
};
