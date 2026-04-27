import { Link } from "react-router-dom";

const ProductCard = ({ product, id }) => {
  return (
    <Link to={`/product/${id}`} className="product-card-related">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;