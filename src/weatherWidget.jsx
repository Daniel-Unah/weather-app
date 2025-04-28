import React, { useEffect, useState } from 'react';
import API_KEY from './config.js'

const WeatherWidget = () => {
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState(null)

    const PATHWAY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(PATHWAY)
            setWeatherData(response.data)
        } catch (error) {
            console.error(error)
        }
    };
    // after every render, fetch the weather data
    useEffect(() => {
        fetchWeatherData();
    }, []);
    const changedCity = (cityInput) => {
        setCity(cityInput)
    }
    const search = (cityInput) => {
        cityInput.preventDefault()
        fetchWeatherData()
        setCity("") // clear the input field after search
    }
    // variables for each piece of weather data
    let temp = weatherData ? Math.ceil((weatherData.main.temp * 9/5) + 32): null
    let realFeel = weatherData ? Math.ceil((weatherData.main.feels_like * 9/5) + 32): null
    let windSpeed = weatherData ? Math.ceil((weatherData.wind.speed) * 2.237): null
    let pressure = weatherData ? (weatherData.main.pressure * 0.02953).toFixed(2): null
}