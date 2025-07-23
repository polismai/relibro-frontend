"use client";

import { useGetBookById } from "@/api/getBookById";
import { useGetGenres } from "@/api/getGenres";
import { updateBook } from "@/api/updateBook";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditBookPage() {
  const { id } = useParams();
  const safeId = typeof id === "string" ? id : "";
  const { genres } = useGetGenres();
  const router = useRouter();

  const { result, loading, error } = useGetBookById(safeId);

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

  useEffect(() => {
    if (result) {
      setForm({
        title: result.title || "",
        author: result.author || "",
        genre: result.genre || "",
        school: result.school || "",
        subject: result.subject || "",
        schoolYear: result.schoolYear || "",
        description: result.description || "",
        price: result.price ? result.price.toString() : "",
        category: result.category || "",
      });
    }
  }, [result]);

  if (!safeId) {
    return <p className="text-center text-red-500">ID inválido</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Actualizando libro...");

    try {
      await updateBook(safeId, {
        ...form,
      price: Number(form.price),
    }); 
      toast.dismiss(toastId);
      toast.success("Libro actualizado correctamente");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("Error al actualizar el libro");
    }
  };

  if (loading) return <p className="text-center">Cargando libro...</p>;
  if (error) return <p className="text-center text-red-500">No se pudo cargar el libro</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Editar libro</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
  
        {form.category === "school" && (
          <>
            <input
              name="subject"
              placeholder="Materia"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
             />

            <input
              name="schoolYear"
              placeholder="Año escolar"
              value={form.schoolYear}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <input
              name="school"
              placeholder="Colegio"
              value={form.school}
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
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

