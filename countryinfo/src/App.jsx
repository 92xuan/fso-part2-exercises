import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Display from './components/Display'
import CountrySearch from './components/CountrySearch'

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountryData, setAllCountryData] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountryData(response.data)
      setIsLoading(false)
    })
  }, [])

  const queryList = useMemo (() => {
    if (!query) return allCountryData;
    return allCountryData.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
  }, [query, allCountryData])

  useEffect (() => {
    if (queryList.length == 1) {
      const lat = queryList[0].latlng[0]
      const lng = queryList[0].latlng[1]

      setIsLoading(true)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=8b25f85b4bd46fae8f4c4124951ae229`)
      .then(response => {setWeatherData(response.data)
        console.log(response.data)
      })
      .then(() => setIsLoading(false))
    }
  }, [queryList])

  const handleSearch = (event) => setQuery(event.target.value)
  const handleShow = (event) => setQuery(event.target.parentElement.firstElementChild.textContent)

  return (
    <>
    <CountrySearch query={query} handleSearch={handleSearch} />
    <Display queryList={queryList} weatherData={weatherData} handleClick={handleShow} isLoading={isLoading}/>
    </>
  )
}

export default App
