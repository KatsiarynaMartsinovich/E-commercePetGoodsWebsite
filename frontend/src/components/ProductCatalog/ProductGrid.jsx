import products from "../../data/products.json";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          id={index + 1}
        />
      ))}
    </div>
  );
};

export default ProductGrid;