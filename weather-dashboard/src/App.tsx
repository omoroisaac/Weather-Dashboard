import { useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { WeatherChart } from './components/WeatherChart';
import { CitySearch } from './components/CitySearch';
import { WeatherAlerts } from './components/WeatherAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Mock data
const mockWeatherData = {
  location: "London",
  country: "United Kingdom",
  temperature: 18,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  feelsLike: 20,
  uvIndex: 4,
};

const mockForecast = [
  { day: "Today", date: "Sep 26", condition: "Partly Cloudy", high: 18, low: 12, precipitation: 20 },
  { day: "Fri", date: "Sep 27", condition: "Rainy", high: 16, low: 10, precipitation: 80 },
  { day: "Sat", date: "Sep 28", condition: "Sunny", high: 22, low: 14, precipitation: 5 },
  { day: "Sun", date: "Sep 29", condition: "Cloudy", high: 19, low: 13, precipitation: 30 },
  { day: "Mon", date: "Sep 30", condition: "Partly Cloudy", high: 21, low: 15, precipitation: 15 },
  { day: "Tue", date: "Oct 1", condition: "Sunny", high: 24, low: 16, precipitation: 0 },
  { day: "Wed", date: "Oct 2", condition: "Rainy", high: 17, low: 11, precipitation: 90 },
];

const mockHourlyData = [
  { time: "00:00", temperature: 15, humidity: 68, windSpeed: 8 },
  { time: "03:00", temperature: 13, humidity: 72, windSpeed: 6 },
  { time: "06:00", temperature: 12, humidity: 75, windSpeed: 5 },
  { time: "09:00", temperature: 16, humidity: 62, windSpeed: 10 },
  { time: "12:00", temperature: 18, humidity: 58, windSpeed: 12 },
  { time: "15:00", temperature: 20, humidity: 55, windSpeed: 15 },
  { time: "18:00", temperature: 19, humidity: 60, windSpeed: 13 },
  { time: "21:00", temperature: 17, humidity: 65, windSpeed: 11 },
];

const mockAlerts = [
  {
    id: "1",
    type: "warning" as const,
    title: "Heavy Rain Warning",
    description: "Heavy rainfall expected between 14:00 and 18:00 today. Possible flooding in low-lying areas.",
    severity: "medium" as const,
    expiresAt: "Today at 18:00"
  },
  {
    id: "2",
    type: "advisory" as const,
    title: "Wind Advisory",
    description: "Strong winds up to 45 km/h expected this evening.",
    severity: "low" as const,
    expiresAt: "Tomorrow at 06:00"
  }
];

export default function App() {
  const [selectedCity, setSelectedCity] = useState(mockWeatherData.location);
  const [weatherData, setWeatherData] = useState(mockWeatherData);

  const handleCitySelect = (city: { name: string; country: string; region: string }) => {
    setSelectedCity(city.name);
    // In a real app, you would fetch new weather data here
    // For now, we'll just update the location
    setWeatherData({
      ...weatherData,
      location: city.name,
      country: city.country,
    });
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

        {/* Current Weather */}
        <WeatherCard data={weatherData} />

        {/* Alerts */}
        <WeatherAlerts alerts={mockAlerts} />

        {/* Charts and Forecast */}
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