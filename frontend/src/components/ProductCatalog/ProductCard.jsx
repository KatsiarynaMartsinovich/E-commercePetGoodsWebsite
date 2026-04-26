import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import star from '../../assets/star.svg';
import half_star from '../../assets/half_star.svg';
import empty_star from '../../assets/empty_star.svg';
import cartIcon from '../../assets/white_basket.svg';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<img key={"full-" + i} src={star} className="star" alt="" />);
  }

  if (hasHalf) {
    stars.push(<img key="half" src={half_star} className="star" alt="" />);
  }

  while (stars.length < 5) {
    stars.push(
      <img key={"empty-" + stars.length} src={empty_star} className="star" alt="" />
    );
  }

  return stars;
};

const ProductCard = ({ product, id }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = (e) => {
    e.preventDefault();

    addToCart(product, id);

    showToast(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />

        <div className="product-overlay">
          <div className="overlay-content">
            <h3 className="overlay-title">{product.name}</h3>

            <div className="rating">
              {renderStars(product.rating)}
              <span>({product.rating})</span>
            </div>

            <div className="overlay-bottom">
              <p className="overlay-price">${product.price}</p>

              <button className="add-to-cart-btn" onClick={handleAdd}>
                <img src={cartIcon} alt="Add to cart" />
              </button>
            </div>
          </div>
        </div>

        <div className="price-badge">
          ${product.price}
        </div>
      </div>

      <div className="product-bottom">
        <h3 className="card-title">{product.name}</h3>

        <div className="rating">
          {renderStars(product.rating)}
          <span>({product.rating})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;