import { useState, useRef, useEffect } from "react";
import expand from "../../assets/expand.svg";

const options = [
  "Name (A-Z)",
  "Name (Z-A)",
  "Price (Low to High)",
  "Price (High to Low)",
];

export const SortDropdown = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="toolbar-right" ref={dropdownRef}>
      <label className="toolbar-right-label">Sort by:</label>

      <div className="dropdown">
        <button
          className="sort-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="toolbar-right-span">{selected}</span>
          <img className="toolbar-right-icon" src={expand} alt="" />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <div
                key={option}
                className={`dropdown-item ${
                  selected === option ? "active" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                <span>{option}</span>

                {selected === option && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="check-icon"
                  >
                    <path
                      d="M11 2L4.5 9.5L1 5.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};