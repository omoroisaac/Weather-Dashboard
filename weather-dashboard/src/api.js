const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(city, unit = "metric") {
  const res = await fetch(
    `${BASE}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch weather");
  return data;
}

export async function fetchForecast(city, unit = "metric") {
  const res = await fetch(
    `${BASE}/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch forecast");
  return data;
}

export async function fetchWeatherByCoords(lat, lon, unit = "metric") {
  const res = await fetch(
    `${BASE}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch location weather");
  return data;
}

export async function fetchForecastByCoords(lat, lon, unit = "metric") {
  const res = await fetch(
    `${BASE}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch location forecast");
  return data;
}