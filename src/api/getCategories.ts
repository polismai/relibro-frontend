import { CategoryType } from "@/types/category";
import { useEffect, useState } from "react";

export function useGetCategories() {
  const imagesByCategory = {
    school: "/images/school-books.jpg",
    story: "/images/story-books.jpg",
  };

  const [categories, setCategories] = useState<(CategoryType & { imageUrl: string})[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
          method: "GET",
        });

        if (!res.ok) throw new Error("Error al cargar las categorías");

        const data: CategoryType[] = await res.json();

        const categoriesWithImages = data.map((cat) => ({
          ...cat,
          imageUrl: imagesByCategory[cat.value as keyof typeof imagesByCategory] || "/images/default.jpg",
        }));

        setCategories(categoriesWithImages);
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
