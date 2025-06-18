import { BookType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetBooks(category?: string | string[]) {
  const [books, setBooks] = useState<BookType[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBooks = async () => {

      try {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`;
        if (category) {
          url += `?category=${category}`;
        }

        const res = await fetch(url);

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
  }, [category]);

  return { loading, books, error };
}


