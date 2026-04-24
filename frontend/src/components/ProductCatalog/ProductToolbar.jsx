import { SortDropdown } from "./SortDropdown";
import filter from '../../assets/filter.svg';

const ProductToolbar = ({
  total,
  sortOption,
  setSortOption,
  onToggleFilters
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button
          className="filter-btn"
          onClick={onToggleFilters}
        >
          <img src={filter} alt="" />
          <span>Filters</span>
        </button>

        <p className="product-count">
          {total} products
        </p>
      </div>

      <SortDropdown
        selected={sortOption}
        onChange={setSortOption}
      />
    </div>
  );
};

export default ProductToolbar;