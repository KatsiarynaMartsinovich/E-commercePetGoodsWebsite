import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getInitialCart = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  // Сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Добавление товара
  const addToCart = (product, id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, id, quantity: 1 }];
    });
  };

  // Общее количество товаров
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalCount }}>
      {children}
    </CartContext.Provider>
  );
};