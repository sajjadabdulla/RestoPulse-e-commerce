import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  return (
    <div className="flex mb-4">
      <input
        className="flex-1 border p-2 rounded-l"
        placeholder="Search products..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => onSearch(text)}
        className="bg-blue-600 text-white px-4 rounded-r"
      >
        Search
      </button>
    </div>
  );
}
