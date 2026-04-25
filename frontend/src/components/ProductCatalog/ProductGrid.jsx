import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <div className="no-products">
          No products match your filters.
        </div>
      ) : (
        products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            id={index}
          />
        ))
      )}
    </div>
  );
};

export default ProductGrid;