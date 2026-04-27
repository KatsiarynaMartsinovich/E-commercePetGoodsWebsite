const CartHeader = ({ totalItems }) => {
  return (
    <div className="cart-header-wrapper">
      <div className="cart-header-container">
        <div className="cart-header-top">
          
          <div>
            <h1 className="cart-header-title">
              Shopping Bag
            </h1>
            <p className="cart-header-subtitle">
              {totalItems} items ready for checkout
            </p>
          </div>

          <div className="cart-steps">
            <div className="cart-step active">
              <div className="cart-step-circle active">1</div>
              <span className="cart-step-label active">Cart</span>
            </div>

            <svg
              className="cart-step-arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>

            <div className="cart-step disabled">
              <div className="cart-step-circle">2</div>
              <span className="cart-step-label">Checkout</span>
            </div>

            <svg
              className="cart-step-arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>

            <div className="cart-step disabled">
              <div className="cart-step-circle">3</div>
              <span className="cart-step-label">Complete</span>
            </div>
          </div>
        </div>

        <div className="cart-header-banner">
          <div className="cart-header-banner-left">
            <svg
              className="cart-tag-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </svg>

            <span className="cart-header-banner-text">
              Free shipping on orders over{" "}
              <span className="highlight">$50</span>
            </span>
          </div>

          <span className="cart-header-qualified">
            ✓ Qualified!
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;