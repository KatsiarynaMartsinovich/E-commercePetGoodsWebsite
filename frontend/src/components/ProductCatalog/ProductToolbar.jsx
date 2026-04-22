import products from "../../data/products.json";
import filter from '../../assets/filter.svg';
import expand from '../../assets/expand.svg';

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

      <div className="toolbar-right">
        <label className="toolbar-right-label">Sort by:</label>

        <button className="sort-btn">
          <span className="toolbar-right-span">Name (A-Z)</span>
          <img className="toolbar-right-icon" src={expand} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProductToolbar;