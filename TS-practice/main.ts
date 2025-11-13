import type { Product } from "./models/product.js";
import { createOrder } from "./services/orderServices.js";
import { formatPrice } from "./utils/productUtils.js";
import { getAllProducts } from "./services/productServices.js";
import type User from "./models/user.js";

const user: User = {
  id: 1,
  name: "Kodeeswaran",
  email: "kodees@example.com",
  address: "Chennai, India",
};

const products = getAllProducts();
console.log("Available Products:", products);

const order = createOrder(user, products.slice(0, 2));

console.log("Order Details:");
console.log("Order ID:", order.id);
console.log("Total:", formatPrice(order.total));
console.log("Products:", order.products.map((p: Product) => p.name).join(", "));



