import { sampleProducts } from "../models/product.js";
export const getAllProducts = () => {
    return sampleProducts;
};
export const getProductsById = (id) => {
    return sampleProducts.find(product => product.id === id);
};
export const updateStock = (id, quantity) => {
    const product = sampleProducts.find(product => product.id === id);
    if (product) {
        product.stock -= quantity;
        console.log(`${product.name} item stock quantity updated successfully`);
    }
    else {
        console.log("product not found.");
    }
};
