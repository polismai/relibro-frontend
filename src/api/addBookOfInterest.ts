import { useState } from "react";
import { toast } from "sonner";

export function useAddBookOfInterest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addBookOfInterest = async (bookId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:3001/api/interests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },       
        body: JSON.stringify({ bookId }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al guardar libro de interés");
      toast.success("Libro agregado a tu lista de interés");

      return await res.json();
    } catch (err: any) {
      setError(err.message);
      toast.error("Error al agregar a la lista");
    } finally {
      setLoading(false);
    }
  };

  return { addBookOfInterest, loading, error };
}
