import { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "../api/cartApi";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const EMPTY_CART = {
  id: null,
  items: [],
  totals: { subtotal: 0, discountPercentage: 0, discountAmount: 0, total: 0 },
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const userId = user?.id;

  const [cart, setCart] = useState(EMPTY_CART);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [loading, setLoading] = useState(Boolean(userId));
  const [mutating, setMutating] = useState(false);

  // Логин/логаут/смена пользователя: подгружаем его корзину или очищаем состояние
  useEffect(() => {
    if (!userId) {
      setCart(EMPTY_CART);
      setAppliedPromo(null);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);

    cartApi
      .get()
      .then((serverCart) => {
        if (!ignore) setCart(serverCart);
      })
      .catch((err) => {
        if (!ignore) showToast(err.message, "error");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [userId, showToast]);

  // Выполняет изменение корзины и, если промокод применён, пересчитывает скидку
  const mutate = async (requestFn) => {
    setMutating(true);
    try {
      let nextCart = await requestFn();

      if (appliedPromo) {
        try {
          nextCart = await cartApi.applyPromo(appliedPromo.code);
        } catch {
          setAppliedPromo(null);
          showToast("Promo code is no longer valid", "error");
        }
      }

      setCart(nextCart);
      return nextCart;
    } finally {
      setMutating(false);
    }
  };

  const addToCart = (productId, quantity = 1) =>
    mutate(() => cartApi.addItem(productId, quantity));

  const updateQuantity = (itemId, quantity) =>
    mutate(() => cartApi.updateItem(itemId, quantity));

  const removeItem = (itemId) => mutate(() => cartApi.removeItem(itemId));

  const applyPromo = async (code) => {
    setMutating(true);
    try {
      const result = await cartApi.applyPromo(code);
      setCart(result);
      setAppliedPromo(result.appliedPromo);
      return result.appliedPromo;
    } finally {
      setMutating(false);
    }
  };

  const removePromo = async () => {
    setMutating(true);
    try {
      setCart(await cartApi.get());
      setAppliedPromo(null);
    } finally {
      setMutating(false);
    }
  };

  const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        totals: cart.totals,
        appliedPromo,
        totalCount,
        loading,
        mutating,
        addToCart,
        updateQuantity,
        removeItem,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};