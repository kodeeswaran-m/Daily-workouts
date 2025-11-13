import type { Product } from "../models/product.js";

export function calculateTotal(products: Product[]): number {
  return products.reduce((acc, p) => acc + p.price, 0);
}

export function applyDiscount(total: number, percentage: number): number {
  return total - (total * percentage) / 100;
}

export function formatPrice(price: number): string {
  return `₹${price.toFixed(2)}`;
}
