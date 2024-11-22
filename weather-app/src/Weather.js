import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from './config.js'


const WeatherWidget = () => {
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState(null)

    const PATHWAY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(PATHWAY)
            setWeatherData(response.data)
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        fetchWeatherData();
    },[]);
    const changedCity = (cityInput) => {
        setCity(cityInput)
    }
    const search = (cityInput) => {
        cityInput.preventDefault()
        fetchWeatherData()
        setCity("")
    }
    let temp = weatherData ? Math.ceil((weatherData.main.temp * 9/5) + 32): null
    let realFeel = weatherData ? Math.ceil((weatherData.main.feels_like * 9/5) + 32): null
    let windSpeed = weatherData ? Math.ceil((weatherData.wind.speed) * 2.237): null
    let pressure = weatherData ? (weatherData.main.pressure * 0.02953).toFixed(2): null
    return(
        <div className = "weather-widget">
            <form onSubmit={search}>
                <input type="text" placeholder="Enter city name" value = {city} onChange={(e) => changedCity(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {weatherData ? (
            <div className="weather-box">
                <h2 className="weather-location">
                    {weatherData.name}, {weatherData.sys.country}
                </h2>
                <div className="weather-grid">
                    <p><strong>Temperature:</strong> {temp}°F</p>
                    <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                    <p><strong>Feels like:</strong> {realFeel}°F</p>
                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                    <p><strong>Pressure:</strong> {pressure} inHg</p>
                    <p><strong>Wind Speed:</strong> {windSpeed} MPH</p>
                </div>
            </div>
            ) : (
                <p className="placeholder-text">Enter a city to see its current weather</p>
            )}
        </div>
    );
};

export default WeatherWidget;