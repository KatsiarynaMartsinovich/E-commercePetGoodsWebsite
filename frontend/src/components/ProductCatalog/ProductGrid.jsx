import ProductCard from "./ProductCard";

const ProductGrid = ({ products, loading, error }) => {
  const renderContent = () => {
    if (error) {
      return <div className="catalog-status catalog-status-error">{error}</div>;
    }

    if (loading && products.length === 0) {
      return <div className="catalog-status">Loading products...</div>;
    }

    if (products.length === 0) {
      return <div className="no-products">No products match your filters.</div>;
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className={`product-grid ${loading ? "is-loading" : ""}`}>
      {renderContent()}
    </div>
  );
};

export default ProductGrid;