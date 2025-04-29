import './App.css';
import './weatherWidget.css'
import WeatherWidget from './weatherWidget.jsx';
import Favorites from './Favorites.jsx';

function App() {
  return (
    <div className="App">
      <div className="page-title">
        <h1>Weather Forecast App</h1>
      </div>
      <WeatherWidget />
      <Favorites />
    </div>
  );
}

export default App;
