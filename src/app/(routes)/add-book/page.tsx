"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBook } from "@/api/createBook";
import { useGetCategories } from "@/api/getCategories";
import { useGetGenres } from "@/api/getGenres";

export default function AddBookPage() {
  const { categories } = useGetCategories();
  const { genres } = useGetGenres();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    school: "",
    subject: "",
    schoolYear: "",
    description: "",
    price: "",
    category: "",
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Cargando libro...");

    try {
      await createBook(form, images);

      toast.dismiss(toastId);
      toast.success("Libro cargado exitosamente", {
        description: "Ya está disponible en la tienda",
        duration: 3000,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Error al cargar el libro. Intentá nuevamente", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Agregar nuevo libro</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories?.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        
        <div className="flex items-center gap-2">
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <span className="text-red-500 text-3xl mt-2">*</span>
        </div>
        

        {form.category === "school" && (
          <>
            <input
              name="subject"
              placeholder="Materia"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
             />

            <input
              name="schoolYear"
              placeholder="Año escolar"
              value={form.schoolYear}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />

            <input
              name="school"
              placeholder="Colegio"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
             />
          </>
        )}

        {form.category === "story" && (
          <>
            <input
              name="author"
              placeholder="Autor"
              value={form.author}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Seleccionar género</option>
                {genres.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
            </select>
          </>
        )}
        
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded resize-none"
          rows={4}
        />

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="block text-sm"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Cargar libro
        </button>
      </form>
    </div>
  );
}
