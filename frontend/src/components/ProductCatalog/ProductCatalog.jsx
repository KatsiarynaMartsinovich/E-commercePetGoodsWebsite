import { useRef, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useProducts } from "../../hooks/useProducts";

const ProductCatalog = () => {
  const {
    products,
    meta,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
    search,
    setSearch,
    sortOption,
    setSortOption,
    page,
    setPage,
  } = useProducts();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const catalogRef = useRef(null);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="catalog-container" ref={catalogRef}>
      <div className="catalog-content">
        <div className="desktop-sidebar">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
            isOpen={true}
          />
        </div>

        <div className="catalog-main">
          <SearchBar value={search} onChange={setSearch} />

          <ProductToolbar
            total={meta?.total_items ?? 0}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onToggleFilters={() => setIsFiltersOpen((prev) => !prev)}
          />

          {isFiltersOpen && (
            <div className="mobile-filters">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onReset={resetFilters}
                isOpen={true}
                onClose={() => setIsFiltersOpen(false)}
              />
            </div>
          )}

          <ProductGrid products={products} loading={loading} error={error} />

          <Pagination
            page={page}
            totalPages={meta?.total_pages ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;