import { useState } from "react";

export default function SearchBar({ onSearch, placeholder = "Enter city (e.g., London)" }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    // optionally clear input: setQ("");
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search city"
        className="flex-1 px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition"
      >
        Search
      </button>
    </form>
  );
}