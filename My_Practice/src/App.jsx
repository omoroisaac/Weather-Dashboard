import { useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { WeatherChart } from './components/WeatherChart';
import { CitySearch } from './components/CitySearch';
import { WeatherAlerts } from './components/WeatherAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const API_KEY = "6fdaa89d77712ccd797e0a955a4b810a";

// ✅ Fetch weather data dynamically
async function fetchWeatherData(city) {
  try {
    console.log("Fetching weather for:", city.name);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data received:", data);

    const currentWeather = {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: (data.visibility / 1000).toFixed(1),
      feelsLike: Math.round(data.main.feels_like),
      uvIndex: "N/A" // OpenWeather free API doesn't include UV index
    };

    return currentWeather;
  } catch (error) {
    console.error("Network or fetch error:", error);
    alert(`Could not load weather data for ${city.name}`);
    return null;
  }
}

export default function App() {
  const [selectedCity, setSelectedCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);

  const handleCitySelect = async (city) => {
    setSelectedCity(city.name);
    const newWeather = await fetchWeatherData(city);
    if (newWeather) setWeatherData(newWeather);
  };

  const mockForecast = [
    { day: "Today", date: "Oct 10", condition: "Partly Cloudy", high: 18, low: 12, precipitation: 20 },
    { day: "Fri", date: "Oct 11", condition: "Rainy", high: 16, low: 10, precipitation: 80 },
    { day: "Sat", date: "Oct 12", condition: "Sunny", high: 22, low: 14, precipitation: 5 },
  ];

  const mockHourlyData = [
    { time: "00:00", temperature: 15, humidity: 68, windSpeed: 8 },
    { time: "03:00", temperature: 13, humidity: 72, windSpeed: 6 },
    { time: "06:00", temperature: 12, humidity: 75, windSpeed: 5 },
  ];

  const mockAlerts = [
    {
      id: "1",
      type: "warning",
      title: "Heavy Rain Warning",
      description: "Heavy rainfall expected between 14:00 and 18:00 today.",
      severity: "medium",
      expiresAt: "Today at 18:00"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1757911012798-e387bb080967"
          alt="Weather background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">Weather Dashboard</h1>
            <p className="text-lg md:text-xl text-white/90">
              Stay informed with real-time weather updates
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="max-w-2xl mx-auto">
          <CitySearch onCitySelect={handleCitySelect} currentCity={selectedCity} />
        </div>

        {weatherData && <WeatherCard data={weatherData} />}

        <WeatherAlerts alerts={mockAlerts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ForecastCard forecast={mockForecast} />

          <div className="space-y-6">
            <Tabs defaultValue="temperature" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="humidity">Humidity</TabsTrigger>
                <TabsTrigger value="wind">Wind</TabsTrigger>
              </TabsList>
              <TabsContent value="temperature">
                <WeatherChart hourlyData={mockHourlyData} type="temperature" />
              </TabsContent>
              <TabsContent value="humidity">
                <WeatherChart hourlyData={mockHourlyData} type="humidity" />
              </TabsContent>
              <TabsContent value="wind">
                <WeatherChart hourlyData={mockHourlyData} type="wind" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}