const SearchBar = ({ setInputText }) => {
	return (
		<div className="search-bar">
			<input type="text" placeholder="Search..." onChange={(e) => {
				setInputText(e.target.value.toLowerCase());
			}} />
		</div>
	);
}

export default SearchBar;