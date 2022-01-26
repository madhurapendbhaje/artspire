import "./Search.scss";

function Search({ placeholderText }) {
    return (
        <input
            type="text"
            placeholder={placeholderText}
            className="search"
            name="search"
        />
    );
}

export default Search;
