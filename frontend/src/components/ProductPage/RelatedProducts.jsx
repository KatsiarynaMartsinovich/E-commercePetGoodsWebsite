import ProductCard from "./ProductCard";
import { useRelatedProducts } from "../../hooks/useRelatedProducts";

const RelatedProducts = ({ currentProduct }) => {
  const related = useRelatedProducts(currentProduct);

  if (related.length === 0) return null;

  return (
    <div className="related-products">
      <h2 className="related-title">Related Products</h2>

      <div className="related-grid">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;