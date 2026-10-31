import { useCart } from "../../context/CartContext";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

const CartContent = () => {
  const { totalCount } = useCart();

  return (
    <div>
      <CartHeader totalItems={totalCount} />

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