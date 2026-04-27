import { useState } from "react";
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

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="catalog-container">
      <div className="catalog-content">
        
        <div className="desktop-sidebar">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={true}
          />
        </div>

        <div className="catalog-main">
          <ProductToolbar
            total={products.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onToggleFilters={() =>
              setIsFiltersOpen((prev) => !prev)
            }
          />

          {isFiltersOpen && (
            <div className="mobile-filters">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                isOpen={true}
                onClose={() => setIsFiltersOpen(false)}
              />
            </div>
          )}

          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;