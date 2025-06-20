"use client";

import BookCard from "./components/book-card";
import { useGetBooks } from "@/api/getBooks";
import SkeletonSchema from "@/components/skeletonSchema";
import { CATEGORY_LABELS } from "@/types/category";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import CatalogFilters from "./components/catalog-filters";
import { BookType } from "@/types/product";
import { useEffect, useState } from "react";
import { useGetGenres } from "@/api/getGenres";

export default function CatalogPage() {
  const { category } = useParams();
  const { genres } = useGetGenres();
  const { loading, books, error } = useGetBooks(category);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);

  useEffect(() => {
    setFilteredBooks(books || []);
  }, [books]);

  const handleFilterChange = ({
    genre,
    minPrice,
    maxPrice,
    sort,
  }: {
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => {
    let updated = [...(books || [])];

    if (genre) {
      updated = updated.filter((book) => book.genre === genre);
    }

    if (minPrice !== undefined) {
      updated = updated.filter((book) => book.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      updated = updated.filter((book) => book.price <= maxPrice);
    }

    if (sort === "price-asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(updated);
  };

  return (
    // <div className="max-w-6xl px-6 py-12 mx-auto">
    //   <h1 className="mb-8 text-3xl font-bold text-center">{CATEGORY_LABELS[category as string]}</h1>
    //   <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    //     {books && books.length > 0 ? (
    //       books.map((book) => <BookCard key={book.id} book={book} />)
    //     ) : (
    //       <p>No hay libros en esta categoría.</p>
    //     )}
    //   </div>
    // </div>
    <div className="max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
      {error && (
        <p className="mb-4 text-red-500 text-center">{error}</p>
      )}

      {!loading && books !== null && (
        <h1 className="text-3xl font-medium mb-2">{CATEGORY_LABELS[category as string]}</h1>
      )}
      <Separator />

      <div className="sm:flex sm:justify-between mt-8">
        <CatalogFilters genres={genres} onFilterChange={handleFilterChange} />

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-10 ml-6">
          {loading && (
            <SkeletonSchema grid={3} />
          )}
          {!loading && filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
          <p className="col-span-full mt-16 text-gray-500 text-lg">No hay libros disponibles en esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
}
