import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";

interface ForecastDay {
  day: string;
  date: string;
  condition: string;
  high: number;
  low: number;
  precipitation: number;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const getWeatherIcon = (condition: string) => {
  const iconClass = "h-8 w-8";
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

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16">
                  <p className="font-medium">{day.day}</p>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(day.condition)}
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {day.condition}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex space-x-2">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-muted-foreground">{day.low}°</span>
                  </div>
                  <p className="text-sm text-blue-500">{day.precipitation}% rain</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}