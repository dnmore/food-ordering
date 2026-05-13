"use client";
import { CartItem } from "@/lib/definitions";
import { createContext, useState, useMemo } from "react";

type CartContextType = {
    cartItems: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {},
    clearCart: () => {},
});

const initialCart: CartItem[] = [];

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

     const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const increaseQuantity = (id: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    

    return (<CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>);}

    export default CartContext;