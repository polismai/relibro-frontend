"use client";

import { useState } from "react";
import { FilterOptions } from "@/types/filters";
import { GenreOption } from "@/types/genre";
import { ChevronDown, ChevronUp } from "lucide-react";

type FilterProps = {
  filters: FilterOptions;
  genres: GenreOption[];
  onFilterChange: (filters: Partial<FilterOptions>) => void;
};

const CatalogFilters = ({ filters, genres, onFilterChange }: FilterProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleChange = (name: keyof FilterOptions, value: string | number | undefined) => {
    const updatedFilters = { ...filters, [name]: value };
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    onFilterChange({
      genre: undefined,
      school: undefined,
      subject: undefined,
      schoolYear: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: undefined,
    });
  };

  const hasFilters = !!(
    filters.genre ||
    filters.school ||
    filters.subject ||
    filters.schoolYear ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.sortBy
  );

  return (
    <>
      {/* Botón solo visible en mobile */}
      <div className="sm:hidden mb-4 px-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex justify-between items-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition "
        >
          {showMobileFilters ? "Ocultar filtros" : "Mostrar filtros"}
          {showMobileFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Contenedor de filtros */}
      <div
        className={`
          flex flex-col space-y-4 w-full sm:max-w-xs p-4 rounded-md border
          ${showMobileFilters ? "block" : "hidden"} sm:block
        `}
      >
        <h2 className="text-lg font-semibold">Filtrar por</h2>

        {/* Género */}
        {filters.category === "story" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Género</label>
            <select
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.genre || "none"}
              onChange={(e) =>
                handleChange("genre", e.target.value === "none" ? undefined : e.target.value)
              }
            >
              <option value="none">Todos los géneros</option>
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Colegio (solo para school) */}
        {filters.category === "school" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Colegio</label>
              <input
                type="text"
                placeholder="Ej: IUA"
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.school ?? ""}
                onChange={(e) => handleChange("school", e.target.value || undefined)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Materia</label>
              <input
                type="text"
                placeholder="Ej: Matemática"
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.subject ?? ""}
                onChange={(e) => handleChange("subject", e.target.value || undefined)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Año escolar</label>
              <input
                type="text"
                placeholder="Ej: 2° de liceo"
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.schoolYear ?? ""}
                onChange={(e) => handleChange("schoolYear", e.target.value || undefined)}
              />
            </div>
          </>
        )}

        {/* Precio mínimo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="minPrice" className="text-sm font-medium">Precio mínimo</label>
          <input
            type="number"
            id="minPrice"
            placeholder="Ej: 100"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              handleChange("minPrice", e.target.value === "" ? undefined : parseInt(e.target.value))
            }
          />
        </div>

        {/* Precio máximo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="maxPrice" className="text-sm font-medium">Precio máximo</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="Ej: 1000"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              handleChange("maxPrice", e.target.value === "" ? undefined : parseInt(e.target.value))
            }
          />
        </div>

        {/* Ordenar por */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Ordenar por</label>
          <select
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.sortBy || "none"}
            onChange={(e) => handleChange("sortBy", e.target.value === "none" ? undefined : e.target.value)}
          >
            <option value="none">-</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="title_asc">Título A-Z</option>
            <option value="title_desc">Título Z-A</option>
          </select>
        </div>

        {hasFilters &&
          <button
            onClick={handleClearFilters}
            className="mt-4 w-full px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Limpiar filtros
          </button>
        }
      </div>
    </>
  );
};

export default CatalogFilters;
