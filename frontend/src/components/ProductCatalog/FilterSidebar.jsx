import FilterSection from "./FilterSection";

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-box">
        <h2 className="filter-title">Filters</h2>

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