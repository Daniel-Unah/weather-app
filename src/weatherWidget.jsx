import React, { useState } from 'react';
import API_KEY from './config.js';

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchWeatherData = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError("City not found.");
        setWeatherData(null);
        return;
      }
      setError(null);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data.");
      setWeatherData(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setCity("");
  };

  return (
    <div className="weather-container">
      <form className="weather-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-box">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="weather-data">
            <p><strong>Temperature:</strong> {Math.ceil((weatherData.main.temp * 9/5) + 32)}°F</p>
            <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
            <p><strong>Feels like:</strong> {Math.ceil((weatherData.main.feels_like * 9/5) + 32)}°F</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Pressure:</strong> {(weatherData.main.pressure * 0.02953).toFixed(2)} inHg</p>
            <p><strong>Wind Speed:</strong> {Math.ceil(weatherData.wind.speed * 2.237)} MPH</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
