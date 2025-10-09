import { useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { WeatherChart } from './components/WeatherChart';
import { CitySearch } from './components/CitySearch';
import { WeatherAlerts } from './components/WeatherAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// 🌦️ Replace this with your OpenWeatherMap API key
const API_KEY = "6fdaa89d77712ccd797e0a955a4b810a";

// Fetch function for current + forecast data
async function fetchWeatherData(city: string) {
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  const [currentRes, forecastRes] = await Promise.all([
    fetch(currentURL),
    fetch(forecastURL),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const current = await currentRes.json();
  const forecast = await forecastRes.json();

  // Map current weather
  const currentWeather = {
    location: current.name,
    country: current.sys.country,
    temperature: current.main.temp,
    condition: current.weather[0].main,
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    visibility: current.visibility / 1000,
    feelsLike: current.main.feels_like,
    uvIndex: 0, // placeholder since free tier doesn't include UV
  };

  // Map forecast (every 8th item ≈ one per day)
  const dailyForecast = forecast.list
    .filter((_: any, index: number) => index % 8 === 0)
    .map((item: any) => ({
      day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
      date: new Date(item.dt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      condition: item.weather[0].main,
      high: item.main.temp_max,
      low: item.main.temp_min,
      precipitation: Math.round(item.pop * 100),
    }));

  // Map hourly data for chart (next 8 intervals ≈ next 24h)
  const hourlyData = forecast.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    temperature: item.main.temp,
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
  }));

  return { currentWeather, dailyForecast, hourlyData };
}

export default function App() {
  const [selectedCity, setSelectedCity] = useState("London");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [hourly, setHourly] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCitySelect = async (city: { name: string; country: string; region: string }) => {
    setSelectedCity(city.name);
    setIsLoading(true);

    try {
      const { currentWeather, dailyForecast, hourlyData } = await fetchWeatherData(city.name);
      setWeatherData(currentWeather);
      setForecast(dailyForecast);
      setHourly(hourlyData);
    } catch (error) {
      console.error(error);
      alert("Could not load weather data for " + city.name);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1757911012798-e387bb080967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwY2xvdWRzJTIwc2t5JTIwYXRtb3NwaGVyaWN8ZW58MXx8fHwxNzU4ODgwMjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <CitySearch onCitySelect={handleCitySelect} currentCity={selectedCity} />
        </div>

        {/* Loading or Weather Data */}
        {isLoading ? (
          <p className="text-center text-muted-foreground">Fetching weather data...</p>
        ) : weatherData ? (
          <>
            <WeatherCard data={weatherData} />

            {/* Alerts (can later be real) */}
            <WeatherAlerts
              alerts={[
                {
                  id: "1",
                  type: "info",
                  title: "Data updated",
                  description: `Latest weather data for ${selectedCity}`,
                  severity: "low",
                  expiresAt: "",
                },
              ]}
            />

            {/* Charts and Forecast */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ForecastCard forecast={forecast} />

              <div className="space-y-6">
                <Tabs defaultValue="temperature" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                    <TabsTrigger value="humidity">Humidity</TabsTrigger>
                    <TabsTrigger value="wind">Wind</TabsTrigger>
                  </TabsList>

                  <TabsContent value="temperature">
                    <WeatherChart hourlyData={hourly} type="temperature" />
                  </TabsContent>
                  <TabsContent value="humidity">
                    <WeatherChart hourlyData={hourly} type="humidity" />
                  </TabsContent>
                  <TabsContent value="wind">
                    <WeatherChart hourlyData={hourly} type="wind" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            Search for a city to view weather data.
          </p>
        )}
      </div>
    </div>
  );
}