import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const Display = ({queryList, singleDisplay, countryData}) => {
  if (queryList.length == 1) {
    const flag = queryList[0].flag
    const name = queryList[0].name.common
    return (<div>
      <h2>{flag}{name}{flag}</h2>
      <div>Population: {queryList[0].population}</div>
      <div>Capital: {queryList[0].capital[0]}</div>
      <h3>Languages</h3>
      <ul>{Object.values(queryList[0].languages).map((language, index) => <li key={index}>{language}</li>)}</ul>
      </div>)
  } else if (queryList.length > 10) {
    return (<div>Too many countries matching query</div>)
  } else if (queryList.length == 0) {
    return (<div>No countries matching query</div>)
  } else {
    return (<ul>{queryList.map((country, index) => <li key={index}>{country.name.common}</li>)}</ul>)
  }
}

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountryData, setAllCountryData] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountryData(response.data)
    })
  }, [])

  // Generate QueryList Dynamically
  const queryList = useMemo (() => {
    if (!query) return allCountryData;
    return allCountryData.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
  }, [query, allCountryData])

  const handleSearch = (event) => setQuery(event.target.value)
  

  return (
    <>
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Search Country:</label>
      <input value={query} onChange={handleSearch}></input>
      <div>{query}</div>
      <Display queryList={queryList}/>
    </form> 
    </>
  )
}

export default App
