export default function WeatherCard({ weather }) {
  if (!weather) return null;
  const { name, sys = {}, main = {}, weather: w = [], wind = {} } = weather;
  const cond = w[0] || {};
  const iconUrl = cond.icon ? `https://openweathermap.org/img/wn/${cond.icon}@4x.png` : "";

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-6">
      {iconUrl && <img src={iconUrl} alt={cond.description} className="w-28 h-28" />}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-4">
          <h2 className="text-2xl font-bold truncate">{name}{sys.country ? `, ${sys.country}` : ""}</h2>
          <div className="text-4xl font-extrabold">{Math.round(main.temp)}°C</div>
        </div>
        <p className="capitalize text-slate-600 mt-1">{cond.description || "—"}</p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-700">
          <div>Humidity: <span className="font-semibold">{main.humidity ?? "—"}%</span></div>
          <div>Wind: <span className="font-semibold">{wind.speed ?? "—"} m/s</span></div>
          <div>Feels like: <span className="font-semibold">{main.feels_like ? `${Math.round(main.feels_like)}°C` : "—"}</span></div>
        </div>
      </div>
    </div>
  );
}