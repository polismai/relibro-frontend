import { useEffect, useState } from "react";

export type CategoryOption = {
  label: string;
  value: string;
};

export function useGetCategories() {
  const [categories, setCategories] = useState<CategoryOption[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
          method: "GET",
        });

        if (!res.ok) throw new Error("Error al cargar las categorías");

        const data: CategoryOption[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
        setError("Error al obtener las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
