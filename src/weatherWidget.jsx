import React, {useState, useEffect} from 'react';
import API_KEY from './config.js';
import Favorites from './Favorites.jsx';

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });
  
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

  const handleFavoriteSelect = (cityName) => {
    setCity(cityName);
    setTimeout(() => {
      fetchWeatherData();
    }, 0);
  };

  const addToFavorites = () => {
    if (!weatherData) return;

    const newFavorite = {
      id: weatherData.id,
      name: weatherData.name,
      country: weatherData.sys.country,
      temp: Math.ceil((weatherData.main.temp * 9/5) + 32),
      description: weatherData.weather[0].description,
    };

    setFavorites(prev => {
      if (prev.find(city => city.id === newFavorite.id)) return prev;
      return [...prev, newFavorite];
    });
    console.log("Added to favorites:", newFavorite);
    console.log("Current favorites:", favorites);
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };
  

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="weather-widget-favorites">
      <form className="weather-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      <div className="widget-row">
        <div className="weather-container">
          {weatherData ? (
            <div className="weather-box">
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
              <button className="favorite-city-button" onClick={addToFavorites}>Favorite This City</button>
              <div className="weather-data">
                <p><strong>Temperature:</strong> {Math.ceil((weatherData.main.temp * 9/5) + 32)}°F</p>
                <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                <p><strong>Feels like:</strong> {Math.ceil((weatherData.main.feels_like * 9/5) + 32)}°F</p>
                <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                <p><strong>Pressure:</strong> {(weatherData.main.pressure * 0.02953).toFixed(2)} inHg</p>
                <p><strong>Wind Speed:</strong> {Math.ceil(weatherData.wind.speed * 2.237)} MPH</p>
              </div>
            </div>
          ) : (
            <div className="placeholderBox">
              <p>Enter a city's name to see it's current weather information.</p>
            </div>
          )}
        </div>
        <Favorites favorites={favorites} favoriteSelect={handleFavoriteSelect} removeFavorite={removeFavorite}/>
      </div>
    </div>
  );
};

export default WeatherWidget;
