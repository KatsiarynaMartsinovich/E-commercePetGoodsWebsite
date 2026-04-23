import { useState } from "react";

const FilterSection = ({
  title,
  mode,
  options = [],
  minValue: initialMinValue = "0",
  maxValue: initialMaxValue = "100",
  currencySymbol = "$",
}) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  
  const [minPrice, setMinPrice] = useState(initialMinValue);
  const [maxPrice, setMaxPrice] = useState(initialMaxValue);

  const handleRatingToggle = (label) => {
    setSelectedRatings((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
  };

  return (
    <div className="filter-section">
      <h2 className="filter-section-title">{title}</h2>

      {mode === "rating" ? (
        <div>
          {options.map((option, index) => (
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
                  selectedRatings.includes(option.label) ? "checked" : ""
                }`}
              >
                {selectedRatings.includes(option.label) && (
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
          ))}
        </div>
      ) : (
        <div className="price-wrapper">
          <div className="price-field">
            <label className="price-label">Min</label>
            <div className="price-input-wrapper">
              <span className="currency">{currencySymbol}</span>
              <input
                type="number"
                value={minPrice}
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
                value={maxPrice}
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