import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentProduct, products }) => {
  const related = products.filter(
    (item) =>
      item.category === currentProduct.category &&
      item.name !== currentProduct.name
  );

  if (related.length === 0) return null;

  return (
    <div className="related-products">
      <h2 className="related-title">Related Products</h2>

      <div className="related-grid">
        {related.map((product) => {
          const realIndex = products.findIndex(
            (p) => p.name === product.name
          );

          return (
            <ProductCard
              key={realIndex}
              product={product}
              id={realIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;