export const getTotalPrice = (cartItems) => {
    return cartItems.reduce((acc, item) => (acc += item.price), 0);
};

export const calculateTax = (totalPrice) => {
    totalPrice *= 0.05;
    return Math.round(totalPrice);
};
