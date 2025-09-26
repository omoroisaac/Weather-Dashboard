import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search city..."
        className="px-4 py-2 rounded border border-gray-300 flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-sky-500 hover:bg-sky-600 text-white"
      >
        Search
      </button>
    </form>
  );
}