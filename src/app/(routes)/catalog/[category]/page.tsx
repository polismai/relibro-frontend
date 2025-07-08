"use client";

import BookCard from "./components/book-card";
import { useGetBooks } from "@/api/getBooks";
import SkeletonSchema from "@/components/skeletonSchema";
import { CATEGORY_LABELS } from "@/types/category";
import { Separator } from "@/components/ui/separator";
import { useParams, useSearchParams } from "next/navigation";
import CatalogFilters from "./components/catalog-filters";
import { useEffect, useState } from "react";
import { useGetGenres } from "@/api/getGenres";
import { FilterOptions } from "@/types/filters";
import SearchInput from "@/components/searchInput";

export default function CatalogPageByCategory() {
  const { category } = useParams();
  const searchParams = useSearchParams();
  const { genres } = useGetGenres();

  const [filters, setFilters] = useState<FilterOptions>({
    category: category as string,
    genre: "",
    school: "",
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: "",
    search: "",
  });

  // 🟨 Limpia el search cuando cambia la categoría
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: category as string,
      search: "",
    }));
  }, [category]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setFilters((prev) => ({ ...prev, search }));
  }, [searchParams]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const { books, loading, error } = useGetBooks(filters);

  return (
    <div className="max-w-7xl p-4 mx-auto sm:py-16 sm:px-24">
      {error && (
        <p className="mb-4 text-red-500 text-center">{error}</p>
      )}

      {!loading && books !== null && (
        <div className="flex items-center w-full justify-between">
          <h1 className="text-3xl font-medium mb-2">{CATEGORY_LABELS[category as string]}</h1>
          <SearchInput />
        </div>
        
      )}
      <Separator />

      <div className="sm:flex sm:justify-between mt-8">
        <CatalogFilters filters={filters} genres={genres} onFilterChange={handleFilterChange} />

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-10 ml-6">
          {loading && (
            <SkeletonSchema grid={3} />
          )}
          {!loading && books && books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
          <p className="col-span-full mt-16 text-gray-500 text-lg">No hay libros disponibles en esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
}
