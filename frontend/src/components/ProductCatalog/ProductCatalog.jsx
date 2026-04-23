import FilterSidebar from "./FilterSidebar";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";
import { useProducts } from "../../hooks/useProducts";

const ProductCatalog = () => {
  const {
    products,
    filters,
    setFilters,
    sortOption,
    setSortOption,
  } = useProducts();

  return (
    <div className="catalog-container">
      <div className="catalog-content">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
        />

        <div className="catalog-main">
          <ProductToolbar
            total={products.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;