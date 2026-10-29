import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export const useAddToCart = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  return async (product, quantity = 1) => {
    if (!isAuthenticated) {
      showToast("Please log in to add items to your cart", "error");
      navigate("/login", { state: { from: location } });
      return false;
    }

    try {
      await addToCart(product.id, quantity);
      showToast(
        quantity > 1
          ? `Added ${quantity} × ${product.title} to cart`
          : `${product.title} added to cart!`
      );
      return true;
    } catch (err) {
      showToast(err.message, "error");
      return false;
    }
  };
};