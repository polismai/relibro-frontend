"use client";

import BookCard from "./components/book-card";
import { ProductType } from "@/types/product"; 
import { useGetBooks } from "@/api/getBooks";
import SkeletonSchema from "@/components/skeletonSchema";

export default function CatalogPage() {
  const { loading, books, error } = useGetBooks();

  if (loading) {
    return  <SkeletonSchema grid={3} />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Catálogo de Libros</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books?.map((book: ProductType) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}