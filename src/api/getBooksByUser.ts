import { useEffect, useState } from "react";
import { BookType } from "../types/product";
import { toast } from "sonner";

export function useGetBooksByUser(userId?: string) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`http://localhost:3001/api/books/my-books`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener libros");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Hubo un error al obtener tus libros");
        toast.error("No se pudieron cargar tus libros");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return { books, loading, error };
}
