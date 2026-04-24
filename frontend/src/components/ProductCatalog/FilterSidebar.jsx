import FilterSection from "./FilterSection";
import closeIcon from "../../assets/close.svg";

const FilterSidebar = ({
  filters,
  setFilters,
  isOpen,
  onClose,
}) => {
  return (
    <aside
      className={`filter-sidebar ${isOpen ? "open" : ""}`}
    >
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
          options={[
            { label: "5+ Stars" },
            { label: "4+ Stars" },
            { label: "3+ Stars" },
          ]}
          filters={filters}
          setFilters={setFilters}
        />

        <FilterSection
          title="Price Range"
          mode="price"
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;