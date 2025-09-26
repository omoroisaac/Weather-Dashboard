import { useState } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "./api";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SearchBar from "./components/SearchBar";
import { getBackground } from "./utils/getBackground";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState(() => localStorage.getItem("unit") || "metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(city) {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchCurrentWeather(city, unit);
      setWeather(data);
      const forecastData = await fetchForecast(city, unit);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleUnit() {
    const next = unit === "metric" ? "imperial" : "metric";
    setUnit(next);
    localStorage.setItem("unit", next);
    if (weather) handleSearch(weather.name);
  }

  function handleGeolocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        setLoading(true);
        const { latitude, longitude } = pos.coords;
        const data = await fetchWeatherByCoords(latitude, longitude, unit);
        setWeather(data);
        const forecastData = await fetchForecastByCoords(latitude, longitude, unit);
        setForecast(forecastData);
      } catch (err) {
        setError("Could not fetch weather for location");
      } finally {
        setLoading(false);
      }
    });
  }

  return (
    <div
      className={`min-h-screen flex items-start justify-center py-12 px-4 transition-colors duration-500 ${
        weather ? getBackground(weather.weather[0].main) : "bg-slate-50"
      }`}
    >
      <div className="w-full max-w-lg">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Weather Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleUnit}
              className="px-3 py-1 rounded bg-sky-100 hover:bg-sky-200 text-sky-700"
            >
              {unit === "metric" ? "Show °F" : "Show °C"}
            </button>
            <button
              onClick={handleGeolocation}
              className="px-3 py-1 rounded bg-green-100 hover:bg-green-200 text-green-700"
            >
              My Location
            </button>
          </div>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <p className="mt-6 text-gray-700">Loading...</p>}
        {error && <p className="mt-6 text-red-500">{error}</p>}

        {weather && <WeatherCard weather={weather} unit={unit} />}
        {forecast && <ForecastCard forecast={forecast} unit={unit} />}
      </div>
    </div>
  );
}

export default App;