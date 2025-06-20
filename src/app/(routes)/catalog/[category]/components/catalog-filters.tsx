"use client";

import { GenreOption } from "@/types/genre";
import { useState } from "react";

type FiltersType = {
  genre?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
};

type FilterProps = {
  genres: GenreOption[]; 
  onFilterChange: (filters: FiltersType) => void;
};

const CatalogFilters = ({ genres, onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FiltersType>({});

 const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-col gap-4 w-full sm:max-w-xs">
      {/* Género */}
      <select name="genre" value={filters.genre || ""} onChange={handleChange} className="border rounded p-2">
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.value} value={genre.value}>{genre.label}</option>
        ))}
      </select>

      {/* Precio mínimo */}
      <input
        type="number"
        name="priceMin"
        placeholder="Precio mínimo"
        value={filters.priceMin || ""}
        onChange={handleChange}
        className="border rounded p-2"
      />

      {/* Precio máximo */}
      <input
        type="number"
        name="priceMax"
        placeholder="Precio máximo"
        value={filters.priceMax || ""}
        onChange={handleChange}
        className="border rounded p-2"
      />

      {/* Ordenar por */}
      <select name="sortBy" value={filters.sortBy || ""} onChange={handleChange} className="border rounded p-2">
        <option value="">Ordenar por</option>
        <option value="price_asc">Precio: menor a mayor</option>
        <option value="price_desc">Precio: mayor a menor</option>
        <option value="title_asc">Título A-Z</option>
        <option value="title_desc">Título Z-A</option>
      </select>
    </div>
  );
};

export default CatalogFilters;