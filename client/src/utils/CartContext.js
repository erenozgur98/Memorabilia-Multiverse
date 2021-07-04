import { createContext } from 'react';

const CartContext = createContext({
    items: [],
    addItem: () => undefined,
    removeItem: () => undefined
});

export default CartContext;