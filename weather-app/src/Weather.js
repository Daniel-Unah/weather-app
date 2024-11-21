import React, { useEffect, useState } from 'react';
import axios from 'axios';


const WeatherWidget = () => {
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState(null)

    const API_KEY = "e7bc058e654d338e18c72b4d63e3f419"
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
    }, []);
    const changedCity = (cityInput) => {
        setCity(cityInput)
    }
    const search = (cityInput) => {
        cityInput.preventDefault()
        fetchWeatherData()
    }
    return(
        <div>
            
        </div>
    );
};