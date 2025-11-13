import { applyDiscount, calculateTotal } from "../utils/productUtils.js";
import { updateStock } from "./productServices.js";
export const createOrder = (user, products) => {
    // Update stock for each product
    products.forEach(product => updateStock(product.id, 1));
    const total = calculateTotal(products);
    const discountedTotal = applyDiscount(total, 10);
    const order = {
        id: Math.floor(Math.random() * 10000),
        user,
        products,
        total: discountedTotal,
        date: new Date()
    };
    console.log("Order created successfully.");
    return order;
};
