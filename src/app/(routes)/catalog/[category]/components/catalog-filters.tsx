"use client";

import { useState } from "react";
import { FilterOptions } from "@/types/filters";
import { GenreOption } from "@/types/genre";
import { ChevronDown, ChevronUp } from "lucide-react";

type FilterProps = {
  filters: FilterOptions;
  genres: GenreOption[];
  onFilterChange: (filters: FilterOptions) => void;
};

const CatalogFilters = ({ filters, genres, onFilterChange }: FilterProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue =
      value === ""
        ? undefined
        : name === "minPrice" || name === "maxPrice"
        ? parseInt(value)
        : value;

    const updatedFilters = { ...filters, [name]: parsedValue };
    onFilterChange(updatedFilters);
  };

  return (
    <>
      {/* Botón solo visible en mobile */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
        >
          {showMobileFilters ? "Ocultar filtros" : "Mostrar filtros"}
          {showMobileFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Contenedor de filtros */}
      <div
        className={`
          flex flex-col gap-4 w-full sm:max-w-xs bg-white p-4 rounded shadow-sm
          ${showMobileFilters ? "block" : "hidden"} sm:block
        `}
      >
        <h2 className="text-lg font-semibold">Filtrar por</h2>

        {/* Género */}
        <div className="flex flex-col">
          <label htmlFor="genre" className="text-sm font-medium mb-1">Género</label>
          <select
            id="genre"
            name="genre"
            value={filters.genre || ""}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
          >
            <option value="">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>

        {/* Precio mínimo */}
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium mb-1">Precio mínimo</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Ej: 100"
            value={filters.minPrice ?? ""}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
          />
        </div>

        {/* Precio máximo */}
        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium mb-1">Precio máximo</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Ej: 1000"
            value={filters.maxPrice ?? ""}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
          />
        </div>

        {/* Ordenar por */}
        <div className="flex flex-col">
          <label htmlFor="sortBy" className="text-sm font-medium mb-1">Ordenar por</label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy || ""}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
          >
            <option value="">Sin orden</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="title_asc">Título A-Z</option>
            <option value="title_desc">Título Z-A</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default CatalogFilters;
