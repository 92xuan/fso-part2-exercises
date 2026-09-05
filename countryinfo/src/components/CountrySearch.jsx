const CountrySearch = ({query, handleSearch}) => {
    return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Search Country:</label>
      <input value={query} onChange={handleSearch}></input>
    </form>) }

export default CountrySearch