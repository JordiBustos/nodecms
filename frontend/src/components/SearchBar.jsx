import propTypes from "prop-types";

const SearchBar = ({ setInputText }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setInputText(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  setInputText: propTypes.func.isRequired,
};

export default SearchBar;

