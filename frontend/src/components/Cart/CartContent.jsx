import { useCart } from "../../context/CartContext";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

const CartContent = () => {
  const { cart } = useCart();

  return (
    <div>
      <CartHeader totalItems={cart.length} />
      
      <div className="cart-page-background">
        <div className="cart-container">
          <div className="cart-layout">
            <CartList />
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;