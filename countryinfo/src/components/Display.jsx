const liStyle = {
    listStyleType: 'none'
   } 

const SingleCountryModule = ({queryList, weatherData}) => {
    const flag = queryList[0].flag
    const name = queryList[0].name.common
    const capital = queryList[0].capital[0]
    const iconURL = `https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`
    return (<div>
      <h2>{flag} {name} {flag}</h2>
      <div>Population: {queryList[0].population}</div>
      <div>Capital: {capital}</div>
      <h3>Languages</h3>
      <ul>{Object.values(queryList[0].languages).map((language, index) => 
        <li key={index} style={liStyle}>{language}</li>)}</ul>
      <h3>Current Weather in {capital}</h3>
      <div>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</div>
      <img src={iconURL} alt="Weather Icon"/>
      <div>Conditions: {weatherData.weather[0].main}</div>
      </div>)
}

const Display = ({queryList, weatherData, handleClick, isLoading}) => {

    if (isLoading) 
        return <div>Loading, please wait...</div>
    else if (queryList.length == 1) 
        return (<SingleCountryModule queryList={queryList} weatherData={weatherData} />);
    else if (queryList.length > 10) 
        return (<div>Too many countries matching query</div>)
    else if (queryList.length == 0) 
    return (<div>No countries matching query</div>)
    else {
    return (<ul>{queryList.map((country, index) => 
        <li key={index} style={liStyle}>
            <span className="country">{country.name.common}</span>
            <button onClick={handleClick}>Show</button>
        </li>
    )}</ul>)
  }
}

export default Display