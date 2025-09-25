import { useState, useEffect } from "react";
import { fetchCurrentWeather } from "./api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentWeatherSearches") || "[]");
    } catch {
      return [];
    }
  });

  async function handleSearch(city) {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchCurrentWeather(city);
      setWeather(data);

      // store recent (unique, keep most recent 5)
      const label = `${data.name}${data.sys?.country ? `,${data.sys.country}` : ""}`;
      setRecent(prev => {
        const next = [label, ...prev.filter(x => x !== label)].slice(0, 5);
        localStorage.setItem("recentWeatherSearches", JSON.stringify(next));
        return next;
      });
    } catch (err) {
      setError(err.message || "Could not fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  function handleRecentClick(label) {
    // label format: "City,COUNTRY" or "City"
    const city = label.split(",")[0];
    handleSearch(city);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Weather Dashboard</h1>
          <p className="text-slate-600">Search current weather by city (OpenWeatherMap)</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-6">
          {loading && (
            <div className="flex items-center gap-3 text-slate-700">
              <div className="inline-block animate-spin border-4 border-slate-300 border-t-slate-600 rounded-full w-6 h-6" />
              Loading...
            </div>
          )}

          {error && <div className="text-red-600">{error}</div>}

          {weather && <WeatherCard weather={weather} />}
        </div>

        {recent.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold mb-2">Recent searches</h2>
            <div className="flex gap-2 flex-wrap">
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRecentClick(r)}
                  className="px-3 py-1 bg-white rounded shadow-sm text-sm hover:bg-slate-50 transition"
                >
                  {r.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;