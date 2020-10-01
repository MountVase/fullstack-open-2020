import React, {useState, useEffect} from 'react'
import axios from 'axios'

// component handles whole Weather thing, parameter is capital, which is the basis of the api call
// component is then integrated into countryinfo
const Weather = ({capital}) => {
    //setting empty dictionary 
    const [weather, setWeather] = useState({})  

    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`

    
    //fetching things from API
    //obs kolla parenteser alltid med useEffect(() => ___)
    useEffect(() => {
        const fetchWeather = async () => {
            const response = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            setWeather(response.data.current)
            console.log(response.data)
        }
        fetchWeather()
    }, [])


    // observera, <img jadwijwaidoawdj/> funkar sådär, int som en vanlig tag
    // obs, måste ha en null clause för att få de att funka
    return (
        <div>
            {weather ? (
            <div>
            <h1>Weather in {capital}</h1>

            <p><b>temperature: </b> {weather.temperature} Celsius</p>
            
            <p><img src={weather.weather_icons} alt="weather icon"/></p>

            <p> <b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir} </p>
            
        </div>
            ): null}
        </div>
    )
}

export default Weather