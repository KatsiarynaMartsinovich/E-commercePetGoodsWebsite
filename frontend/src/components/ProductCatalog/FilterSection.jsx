const FilterSection = ({
  title,
  mode,
  options = [],
  minValue = "0",
  maxValue = "100",
  currencySymbol = "$",
}) => {
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
            >
              <button className="filter-checkbox" />

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
                value={minValue}
                readOnly
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
                value={maxValue}
                readOnly
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