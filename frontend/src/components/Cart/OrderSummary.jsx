import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { validatePromoCode } from "../../utils/promoCode";

const OrderSummary = () => {
  const { cart } = useCart();
  const { showToast } = useToast();

  const [promo, setPromo] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const totalItems = cart.length;

  const handleApplyPromo = () => {
    const result = validatePromoCode(promo);

    if (result.status === "empty") {
      return;
    }

    if (result.status === "valid") {
      showToast("Promo code applied! 10% discount");
      return;
    }

    if (result.status === "invalid") {
      showToast("Invalid promo code");
    }
  };

  return (
    <div className="summary-wrapper">
      <div className="summary">

        <div className="summary-header">
          <h2>Order Summary</h2>
          <p>{totalItems} items in your bag</p>
        </div>

        <div className="summary-body">

          <div className="promo">
            <label>
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
                <circle cx="7.5" cy="7.5" r=".5" />
              </svg>
              Promo Code
            </label>

            <div className="promo-row">
              <input
                placeholder="Enter code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />

              <button onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
          </div>

          <div className="summary-prices">
            <div>
              <span className="span-description">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div>
              <span className="span-description">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="total">
              <span className="span-description-total">Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-info">

            <div className="info-box blue">
              <div className="icon-box">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p>Delivery Time</p>
                <span>3-5 business days</span>
              </div>
            </div>

            <div className="info-box purple">
              <div className="icon-box">
                <svg viewBox="0 0 24 24">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p>Shipping To</p>
                <span>123 Main Street, NY 10001</span>
              </div>
            </div>

          </div>

          <button className="checkout">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            Proceed to Checkout
          </button>

          <a className="continue">← Continue Shopping</a>

        </div>
      </div>
    </div>
  );
};

export default OrderSummary;