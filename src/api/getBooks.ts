import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetBooks() {
  const [books, setBooks] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`;

      try {
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message.split("::")[1] || "Error al traer los libros");
        }

        const data: ProductType[] = await res.json();
        setBooks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error");
        }
        setBooks(null);
      } finally {
        setLoading(false);
      }
    };
      
    fetchBooks();
  }, []);

  return { loading, books, error };
}


