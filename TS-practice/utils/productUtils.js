export function calculateTotal(products) {
    return products.reduce((acc, p) => acc + p.price, 0);
}
export function applyDiscount(total, percentage) {
    return total - (total * percentage) / 100;
}
export function formatPrice(price) {
    return `₹${price.toFixed(2)}`;
}
