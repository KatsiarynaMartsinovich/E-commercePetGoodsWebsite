import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card-related">
      <div className="product-card-image">
        <img src={product.images?.[0]} alt={product.title} />
      </div>

      <div className="product-card-body">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;