import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({queryList, singleDisplay, countryData}) => {
  if (singleDisplay) {
    const flag = countryData.flag
    const name = countryData.name.common
    return (<div>
      <h2>{flag}{name}{flag}</h2>
      <div>Population: {countryData.population}</div>
      <div>Capital: {countryData.capital[0]}</div>
      <h3>Languages</h3>
      <ul>{Object.values(countryData.languages).map((language, index) => <li key={index}>{language}</li>)}</ul>
      </div>)
  } else if (queryList.length > 10) {
    return (<div>Too many countries matching query</div>)
  } else if (queryList.length == 0) {
    return (<div>No countries matching query</div>)
  } else {
    return (<ul>{queryList.map((country, index) => <li key={index}>{country}</li>)}</ul>)
  }
}

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountryData, setAllCountryData] = useState([])
  const [queryCountryData, setQueryCountryData] = useState([])
  const [countryList, setCountryList] = useState([])
  const [queryList, setQueryList] = useState([])
  const [singleDisplay, setSingleDisplay] = useState(false)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountryData(response.data)
      const initialList = response.data.map(country => country.name.common)
      setCountryList(initialList)
      setQueryList(initialList)
    })
  }, [])

  useEffect(() => {
    console.log(queryList)
    if (queryList.length === 1) {
      setSingleDisplay(true)
      const countryName = queryList[0]
      const newCountryData = allCountryData.filter(country => country.name.common.toLowerCase() === countryName.toLowerCase())[0]
      setQueryCountryData(newCountryData)
    } else {
      setSingleDisplay(false)
    }
  }, [queryList])

  const handleSearch = (event) => {
    setQuery(event.target.value)
    setQueryList(countryList.filter(country => country.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <>
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Search Country:</label>
      <input value={query} onChange={handleSearch}></input>
      <div>{query}</div>
      <Display queryList={queryList} countryData={queryCountryData} singleDisplay={singleDisplay}/>
    </form> 
    </>
  )
}

export default App
