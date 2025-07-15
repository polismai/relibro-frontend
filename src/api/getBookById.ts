import { BookType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetBookById(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${slug}`;
  const [result, setResult] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          credentials: 'include',
        });

        const result = await res.json();
        
        if (!res.ok) {
          throw new Error(result.message.split("::")[1]);
        }

        setResult(result);
        setLoading(false)

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error inesperado");
        }
      } finally {
        setLoading(false);
      }
    })()
  }, [url])

  return { loading, result, error };
}