const SearchBar = ({searchName, handleSearchName}) => {
    return (
        <div>
          Search: <input
          value={searchName} 
          onChange={handleSearchName}/>
        </div>
    )
}

export default SearchBar