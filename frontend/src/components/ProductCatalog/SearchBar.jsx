import searchIcon from "../../assets/search.svg";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <img src={searchIcon} alt="" className="search-bar-icon" />
      <input
        type="search"
        className="search-bar-input"
        placeholder="Search by name or description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;