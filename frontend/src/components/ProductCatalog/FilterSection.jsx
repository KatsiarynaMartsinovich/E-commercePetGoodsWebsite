const FilterSection = ({
  title,
  mode,
  options = [],
  filters,
  setFilters,
  currencySymbol = "$",
}) => {
  const handleRatingToggle = (value) => {
    setFilters((prev) => ({
      ...prev,
      minRating: prev.minRating === value ? null : value,
    }));
  };

  const handlePriceChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="filter-section">
      <h2 className="filter-section-title">{title}</h2>

      {mode === "rating" ? (
        <div>
          {options.map((option, index) => {
            const checked = filters.minRating === option.value;

            return (
              <div
                key={option.value}
                className={`filter-option ${
                  index !== options.length - 1 ? "mb-3" : ""
                }`}
                onClick={() => handleRatingToggle(option.value)}
                style={{ cursor: "pointer" }}
              >
                <div className={`filter-checkbox ${checked ? "checked" : ""}`}>
                  {checked && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 2L4.5 9.5L1 5.5"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <label className="filter-label">{option.label}</label>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="price-wrapper">
          <div className="price-field">
            <label className="price-label">Min</label>
            <div className="price-input-wrapper">
              <span className="currency">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={filters.minPrice}
                onChange={handlePriceChange("minPrice")}
                className="price-input"
              />
            </div>
          </div>

          <div className="price-separator">-</div>

          <div className="price-field">
            <label className="price-label">Max</label>
            <div className="price-input-wrapper">
              <span className="currency">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                placeholder="Any"
                value={filters.maxPrice}
                onChange={handlePriceChange("maxPrice")}
                className="price-input"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;