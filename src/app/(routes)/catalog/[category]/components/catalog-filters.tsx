"use client";

import { useState } from "react";
import { FilterOptions } from "@/types/filters";
import { GenreOption } from "@/types/genre";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type FilterProps = {
  filters: FilterOptions;
  genres: GenreOption[];
  onFilterChange: (filters: Partial<FilterOptions>) => void;
};

const CatalogFilters = ({ filters, genres, onFilterChange }: FilterProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleChange = (name: string, value: string) => {

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
        <Button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          variant="default"
          className="w-full flex justify-between"
        >
          {showMobileFilters ? "Ocultar filtros" : "Mostrar filtros"}
          {showMobileFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Contenedor de filtros */}
      <div
        className={`
          flex flex-col gap-4 w-full sm:max-w-xs p-4 rounded-md border
          ${showMobileFilters ? "block" : "hidden"} sm:block
        `}
      >
        <h2 className="text-lg font-semibold">Filtrar por</h2>

        {/* Género */}
        <div className="flex flex-col gap-1">
          <Label>Género</Label>
          <Select
            value={filters.genre || ""}
            onValueChange={(value) => handleChange("genre", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los géneros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos los géneros</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Precio mínimo */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="minPrice">Precio mínimo</Label>
          <Input
            type="number"
            id="minPrice"
            placeholder="Ej: 100"
            value={filters.minPrice ?? ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
        </div>

        {/* Precio máximo */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="maxPrice">Precio máximo</Label>
          <Input
            type="number"
            id="maxPrice"
            placeholder="Ej: 1000"
            value={filters.maxPrice ?? ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </div>

        {/* Ordenar por */}
        <div className="flex flex-col">
          <Label>Ordenar por</Label>
          <Select
            value={filters.sortBy || ""}
            onValueChange={(value) => handleChange("sortBy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sin orden" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Sin orden</SelectItem>
              <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="title_asc">Título A-Z</SelectItem>
              <SelectItem value="title_desc">Título Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default CatalogFilters;
