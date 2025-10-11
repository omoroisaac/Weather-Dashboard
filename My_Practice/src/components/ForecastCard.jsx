import { Card, CardContent, CardHeader } from "./ui/card";
import { CloudRain, Sun, Cloud, CloudSnow } from "lucide-react";

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case "rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case "cloudy":
    case "partly cloudy":
      return <Cloud className="h-6 w-6 text-gray-400" />;
    case "snowy":
      return <CloudSnow className="h-6 w-6 text-blue-200" />;
    default:
      return <Cloud className="h-6 w-6 text-gray-400" />;
  }
};

export function ForecastCard({ forecast }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">7-Day Forecast</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-muted/30 p-3 rounded-md"
            >
              <div>
                <p className="font-medium">{day.day}</p>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getWeatherIcon(day.condition)}
                <p className="text-sm">
                  {day.high}° / {day.low}°
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}