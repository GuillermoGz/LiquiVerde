import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


    const addToCart = (product) => {
        setCart(prev => {
            const found = prev.find(item => item._id === product._id);

            if (found) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (product) => {
        setCart(prev => {
            const found = prev.find(item => item._id === product._id);

            if (!found) return prev;

            if (found.qty === 1) {
                return prev.filter(item => item._id !== product._id);
            }

            return prev.map(item =>
                item._id === product._id
                    ? { ...item, qty: item.qty - 1 }
                    : item
            );
        });
    };

    const deleteCart = () => {
        setCart([]);
    };

    const fillCart = (products) => {
        setCart(products);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteCart, fillCart }}>
            {children}
        </CartContext.Provider>
    )
}