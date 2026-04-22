import FilterSidebar from "./FilterSidebar";
// import ProductToolbar from "./ProductToolbar";
// import ProductGrid from "./ProductGrid";

const ProductCatalog = () => {
  return (
    <div className="catalog-container">
      <div className="catalog-content">
        <FilterSidebar />

        <div className="catalog-main">
          {/* <ProductToolbar /> */}
          {/* <ProductGrid /> */}
          <div>Products here...</div>
    
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;