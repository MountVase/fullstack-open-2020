
import React from "react";
import Weather from './Weather'

function CountryInfo({ country }) {
  const { name, capital, population, languages, flag } = country 
  //defining all the small useful variables


  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img src={flag} alt={name} width="100" />
      
      <Weather capital={capital}/>
    </div>
  )
}

export default CountryInfo