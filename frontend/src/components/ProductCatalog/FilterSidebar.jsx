import FilterSection from "./FilterSection";
import closeIcon from "../../assets/close.svg";
import { RATING_OPTIONS } from "../../constants/catalog";

const FilterSidebar = ({ filters, setFilters, onReset, isOpen, onClose }) => {
  return (
    <aside className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <div className="filter-box">
        <div className="filter-header">
          <h2 className="filter-title">Filters</h2>

          <button className="filter-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <FilterSection
          title="Rating"
          mode="rating"
          options={RATING_OPTIONS}
          filters={filters}
          setFilters={setFilters}
        />

        <FilterSection
          title="Price Range"
          mode="price"
          filters={filters}
          setFilters={setFilters}
        />

        <button className="filter-reset-btn" onClick={onReset}>
          Reset filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;