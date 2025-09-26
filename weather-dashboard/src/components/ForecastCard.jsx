export default function ForecastCard({ forecast, unit }) {
  if (!forecast) return null;

  const daily = forecast.list.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {daily.map(day => {
          const cond = day.weather[0];
          const iconUrl = `https://openweathermap.org/img/wn/${cond.icon}@2x.png`;
          const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          return (
            <div
              key={day.dt}
              className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition"
            >
              <div className="text-sm text-slate-600">{date}</div>
              <img src={iconUrl} alt={cond.description} className="mx-auto w-12 h-12" />
              <div className="font-bold">
                {Math.round(day.main.temp)}°{unit === "metric" ? "C" : "F"}
              </div>
              <div className="text-xs capitalize">{cond.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}