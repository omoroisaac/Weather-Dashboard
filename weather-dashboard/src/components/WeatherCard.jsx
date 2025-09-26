export default function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="w-20 h-20 mx-auto animate-float"
      />
      <p className="text-lg font-semibold">
        {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
      </p>
      <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
        <div>
          <p>Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div>
          <p>Wind</p>
          <p>
            {Math.round(weather.wind.speed)} {unit === "metric" ? "m/s" : "mph"}
          </p>
        </div>
        <div>
          <p>Feels Like</p>
          <p>{Math.round(weather.main.feels_like)}°</p>
        </div>
      </div>
    </div>
  );
}