import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, decreaseFromCart, removeFromCart } = useCart();

  return (
    <div className="cart-card group">
      <div className="cart-card-inner">
        <a href={`/product/${item.id}`} className="cart-image">
          <img src={item.image} alt={item.name} />
        </a>

        <div className="cart-grid">
          <div className="cart-info">
            <a href={`/product/${item.id}`} className="cart-title">
              {item.name}
            </a>
            <p className="cart-category">{item.category}</p>
          </div>

          <div className="cart-qty-wrapper">
            <div className="cart-qty">
              <button
                onClick={() => decreaseFromCart(item.id)}
              >
                –
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => addToCart(item, item.id)}>
                +
              </button>
            </div>
          </div>

          <div className="cart-price">
            <div className="cart-price-text">
              <p className="price-total">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="price-each">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            <button
              className="remove-btn"
              aria-label="Remove item"
              onClick={() => removeFromCart(item.id)}
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