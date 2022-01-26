import "./Search.scss";

function Search({ placeholderText }) {
    return (
        <div className="search">
            <input
                type="text"
                placeholder={placeholderText}
                className="search__bar"
            />
        </div>
    );
}

export default Search;
