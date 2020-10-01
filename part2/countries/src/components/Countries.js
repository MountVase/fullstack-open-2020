import React, { useState } from "react";
import CountryInfo from './CountryInfo'

function Countries({ countries }) {
  const [detailedCountries, setDetailedCountries] = useState([]) // array of stuff

  const handleShow = (event) => {
    setDetailedCountries(detailedCountries.concat(event.target.value))
  }

  switch (true) {
    case countries.length > 10:
      return <p>Too many matches, specify another filter</p>

    case countries.length === 1:
      return <CountryInfo country={countries[0]} />

    case countries.length > 1 && countries.length <= 10:

      const countryComponent = (country) => {
        const showCountryDetail = detailedCountries.some((name) => name === country.name)
        //returns boolean
        console.log(showCountryDetail)

        
        // option to show
        // if true return info, if false, add a button that shows the country onClick
        return showCountryDetail ? (
          <CountryInfo country={country} key={country} />
        ) : (
          <div key={country.name}>
            {country.name}
            <button onClick={handleShow} value={country.name}>
              show
            </button>
          </div>
        )
      }
      return countries.map((country) => countryComponent(country))
      
      
      default:
        return null // if none of the cases apply 
   
  }
}

export default Countries
