const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(city) {
  if (!API_KEY) throw new Error("Missing OpenWeather API key. Set REACT_APP_OPENWEATHER_API_KEY in .env.local");

  const res = await fetch(
    `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();

  // OpenWeather returns a `cod` field (200 on success) but sometimes as string.
  if (!res.ok || (data.cod && +data.cod !== 200)) {
    throw new Error(data.message || "Failed to fetch weather");
  }
  return data;
}