import products from "../../data/products.json";
import { SortDropdown } from "./SortDropdown";
import filter from '../../assets/filter.svg';

const ProductToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button className="filter-btn">
          <img src={filter} alt="" />
          <span>Filters</span>
        </button>

        <p className="product-count">
          {products.length} products
        </p>
      </div>

      <SortDropdown />
    </div>
  );
};

export default ProductToolbar;