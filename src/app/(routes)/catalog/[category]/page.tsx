"use client";

import BookCard from "./components/book-card";
import { useGetBooks } from "@/api/getBooks";
import SkeletonSchema from "@/components/skeletonSchema";
import { CATEGORY_LABELS } from "@/types/category";
import { useParams } from "next/navigation";


export default function CatalogPage() {
  const { category } = useParams();

  const { loading, books, error } = useGetBooks(category);

  if (loading) return <SkeletonSchema grid={3} />;

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">{CATEGORY_LABELS[category as string]}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books && books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No hay libros en esta categoría.</p>
        )}
      </div>
    </div>
  );
}