import { FilterOptions } from "@/types/filters";
import { BookType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetBooks(filters: FilterOptions) {
  const [books, setBooks] = useState<BookType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString());
        }
      });

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/filter?${params.toString()}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message.split("::")[1] || "Error al obtener los libros");
        }

        const data: BookType[] = await res.json();
        setBooks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error inesperado");
        }
        setBooks(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filters]);

  return { loading, books, error };
}


