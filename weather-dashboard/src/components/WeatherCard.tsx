import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets } from "lucide-react";

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const iconClass = "h-16 w-16";
  switch (condition.toLowerCase()) {
    case "sunny":
    case "clear":
      return <Sun className={`${iconClass} text-yellow-500`} />;
    case "cloudy":
    case "partly cloudy":
      return <Cloud className={`${iconClass} text-gray-500`} />;
    case "rainy":
    case "rain":
      return <CloudRain className={`${iconClass} text-blue-500`} />;
    case "snowy":
    case "snow":
      return <CloudSnow className={`${iconClass} text-blue-200`} />;
    default:
      return <Cloud className={`${iconClass} text-gray-500`} />;
  }
};

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl">{data.location}</h2>
            <p className="text-muted-foreground">{data.country}</p>
          </div>
          <Badge variant="secondary">{data.condition}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(data.condition)}
            <div>
              <div className="text-4xl font-medium">{data.temperature}°C</div>
              <p className="text-muted-foreground">Feels like {data.feelsLike}°C</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{data.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">{data.windSpeed} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="font-medium">{data.visibility} km</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">UV Index</p>
              <p className="font-medium">{data.uvIndex}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}