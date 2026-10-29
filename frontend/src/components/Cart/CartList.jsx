import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const CartList = () => {
  const { items } = useCart();

  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;