const FilterSection = ({
  title,
  mode,
  options = [],
  filters,
  setFilters,
  minValue = "0",
  maxValue = "100",
  currencySymbol = "$",
}) => {

  const handleRatingToggle = (label) => {
    setFilters((prev) => {
      const exists = prev.ratings.includes(label);

      return {
        ...prev,
        ratings: exists
          ? prev.ratings.filter((r) => r !== label)
          : [...prev.ratings, label],
      };
    });
  };

  const handleMinPriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: Number(e.target.value),
    }));
  };

  const handleMaxPriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: Number(e.target.value),
    }));
  };

  return (
    <div className="filter-section">
      <h2 className="filter-section-title">{title}</h2>

      {mode === "rating" ? (
        <div>
          {options.map((option, index) => {
            const checked = filters.ratings.includes(option.label);

            return (
              <div
                key={index}
                className={`filter-option ${
                  index !== options.length - 1 ? "mb-3" : ""
                }`}
                onClick={() => handleRatingToggle(option.label)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`filter-checkbox ${
                    checked ? "checked" : ""
                  }`}
                >
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

                <label className="filter-label">
                  {option.label}
                </label>
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
                value={filters.minPrice}
                onChange={handleMinPriceChange}
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
                value={filters.maxPrice}
                onChange={handleMaxPriceChange}
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