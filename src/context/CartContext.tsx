"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Meal = {
  id: string;
  name: string;
  quantity: number;
};

type CartContextType = {
  cartItems: Meal[];
  addToCart: (meal: Meal) => void;
  removeFromCart: (mealId: string) => void;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  refreshCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Meal[]>([]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/cart", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.data.items || []);
      }
    } catch (err) {
      console.log("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = (meal: Meal) => {
    setCartItems((prev) => {
      // যদি item already থাকে quantity update করতে পার
      const exists = prev.find((i) => i.id === meal.id);
      if (exists) {
        return prev.map((i) =>
          i.id === meal.id ? { ...i, quantity: i.quantity + meal.quantity } : i,
        );
      }
      return [...prev, meal];
    });
  };

  const removeFromCart = (mealId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== mealId));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, refreshCart: fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
