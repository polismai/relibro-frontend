"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();
  const params = useParams();
  const category = params?.category;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/catalog/${category}?search=${encodeURIComponent(query.trim())}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      // Si borró todo el texto, limpiamos el filtro de búsqueda en la URL
      router.push(`/catalog/${category}`);
    }
  };

  return (
    <div className="pb-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
        {(showInput || query.length > 0) && (
          <input
            type="text"
            placeholder="Buscar libros..."
            value={query}
            onChange={handleChange}
            className={`flex-1 border rounded-md px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              showInput ? "block" : "hidden"
            }`}
            autoFocus
          />
        )}

        <button
          type={showInput ? "submit" : "button"}
          className="flex items-center justify-center border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
          aria-label="Buscar"
          onClick={() => {
            if (!showInput) setShowInput(true);
          }}
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;