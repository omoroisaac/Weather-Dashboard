export function getBackground(condition = "") {
  condition = condition.toLowerCase();
  if (condition.includes("cloud")) return "bg-gradient-to-br from-gray-200 to-gray-500";
  if (condition.includes("rain")) return "bg-gradient-to-br from-blue-400 to-blue-700";
  if (condition.includes("clear")) return "bg-gradient-to-br from-sky-300 to-sky-500";
  if (condition.includes("snow")) return "bg-gradient-to-br from-blue-100 to-white";
  return "bg-gradient-to-br from-slate-200 to-slate-400";
}