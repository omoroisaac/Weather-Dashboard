import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface HourlyData {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherChartProps {
  hourlyData: HourlyData[];
  type: 'temperature' | 'humidity' | 'wind';
}

export function WeatherChart({ hourlyData, type }: WeatherChartProps) {
  const getChartConfig = () => {
    switch (type) {
      case 'temperature':
        return {
          title: 'Temperature Trend',
          dataKey: 'temperature',
          color: '#ef4444',
          unit: '°C'
        };
      case 'humidity':
        return {
          title: 'Humidity Levels',
          dataKey: 'humidity',
          color: '#3b82f6',
          unit: '%'
        };
      case 'wind':
        return {
          title: 'Wind Speed',
          dataKey: 'windSpeed',
          color: '#10b981',
          unit: 'km/h'
        };
      default:
        return {
          title: 'Weather Data',
          dataKey: 'temperature',
          color: '#6366f1',
          unit: ''
        };
    }
  };

  const config = getChartConfig();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: config.color }}>
            {config.title}: {payload[0].value}{config.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'temperature' ? (
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={config.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  fillOpacity={1}
                  fill="url(#temperatureGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  strokeWidth={2}
                  dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}