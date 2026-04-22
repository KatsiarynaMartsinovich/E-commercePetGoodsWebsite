import FilterSection from "./FilterSection";

const FilterSidebar = () => {
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
        />

        <FilterSection
          title="Price Range"
          mode="price"
          minValue="0"
          maxValue="100"
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;