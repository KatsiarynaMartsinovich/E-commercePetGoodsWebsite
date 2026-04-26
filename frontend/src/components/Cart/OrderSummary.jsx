import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>

      <div className="cart-summary__block">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="cart-summary__row">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="cart-summary__total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="cart-summary__checkout">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;