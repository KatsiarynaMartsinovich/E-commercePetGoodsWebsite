const CartItem = ({ item }) => {
  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item__inner">
        <div className="cart-item__image">
          <img src={item.image} alt={item.title} />
        </div>

        <div className="cart-item__content">
          <div>
            <h3 className="cart-item__title">{item.title}</h3>
            <p className="cart-item__category">{item.category}</p>
          </div>

          <div className="cart-item__quantity">
            <button>-</button>
            <span>{item.quantity}</span>
            <button>+</button>
          </div>

          <div className="cart-item__price">
            <p className="cart-item__total">${totalPrice}</p>
            <p className="cart-item__each">${item.price} each</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;