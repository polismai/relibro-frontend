import { UserInterestType } from "@/types/userInterest";
import { useEffect, useState } from "react";

export function useGetBooksOfInterest(userId?: string) {
  const [interestedBooks, setInterestedBooks] = useState<UserInterestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchBooksOfInterest = async () => {
      try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interests`, {
        credentials: 'include',
      })

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message.split("::")[1] || "Error al obtener los libros de interés");
      }

      const data: UserInterestType[] = await res.json();
        setInterestedBooks(data);
    } catch (err) {
      if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error inesperado");
        }
      } finally {
        setLoading(false);
      }
    }; 

    fetchBooksOfInterest();
  }, [userId]);

  return { interestedBooks, loading, error };
}

