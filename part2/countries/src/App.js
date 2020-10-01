
import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import axios from "axios";
import Countries from "./components/Countries";


function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");


  let filteredCountries = [...countries]

  if(search !== "") {
      filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()) ) 
  }

  useEffect(() => {
    const fetchCountries = async () => {

    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => setCountries(response.data))
  }
  fetchCountries()
}, [])



  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
