import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import CartHeader from "./CartHeader";

const CartContent = () => {
  const { cart } = useCart();

  const totalItems = cart.length;

  return (
    <div>
        <CartHeader totalItems={totalItems} />
        <div className="cart-page">
            <div className="cart-full">

              <div className="cart-layout">
                <div className="cart-items">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <OrderSummary />
              </div>
            </div>
        </div>
    </div>
  );
};

export default CartContent;