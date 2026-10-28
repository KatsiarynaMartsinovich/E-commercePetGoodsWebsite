import { Link } from "react-router-dom";

const ProductStatus = ({ title, text, showHomeLink = false }) => {
  return (
    <div className="product-status">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {showHomeLink && (
        <Link to="/" className="product-status-link">
          Back to catalog
        </Link>
      )}
    </div>
  );
};

export default ProductStatus;