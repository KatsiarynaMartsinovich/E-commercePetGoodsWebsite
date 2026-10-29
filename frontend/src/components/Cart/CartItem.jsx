import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem, mutating } = useCart();
  const { showToast } = useToast();
  const { product } = item;

  const run = async (action, successMessage) => {
    try {
      await action();
      if (successMessage) showToast(successMessage);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDecrease = () =>
    run(() => updateQuantity(item.id, item.quantity - 1));

  const handleIncrease = () =>
    run(() => updateQuantity(item.id, item.quantity + 1));

  const handleRemove = () =>
    run(() => removeItem(item.id), `${product.title} removed from cart`);

  return (
    <div className="cart-card group">
      <div className="cart-card-inner">
        <Link to={`/product/${product.id}`} className="cart-image">
          <img src={product.images?.[0]} alt={product.title} />
        </Link>

        <div className="cart-grid">
          <div className="cart-info">
            <Link to={`/product/${product.id}`} className="cart-title">
              {product.title}
            </Link>
            <p className="cart-category">{product.stockQuantity} in stock</p>
          </div>

          <div className="cart-qty-wrapper">
            <div className="cart-qty">
              <button
                onClick={handleDecrease}
                disabled={mutating || item.quantity <= 1}
              >
                –
              </button>

              <span>{item.quantity}</span>

              <button onClick={handleIncrease} disabled={mutating}>
                +
              </button>
            </div>
          </div>

          <div className="cart-price">
            <div className="cart-price-text">
              <p className="price-total">
                ${(product.price * item.quantity).toFixed(2)}
              </p>
              <p className="price-each">${product.price.toFixed(2)} each</p>
            </div>

            <button
              className="remove-btn"
              aria-label="Remove item"
              onClick={handleRemove}
              disabled={mutating}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-trash"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;