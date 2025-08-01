"use client";

import { useGetBookById } from "@/api/getBookById";
import { useGetGenres } from "@/api/getGenres";
import { useGetSchools } from "@/api/getSchools";
import { useGetSchoolYears } from "@/api/getSchoolYears";
import { updateBook } from "@/api/updateBook";
import { BookFormType } from "@/types/updateBookForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditBookPage() {
  const { id } = useParams();
  const safeId = typeof id === "string" ? id : "";
  const router = useRouter();

  const { genres } = useGetGenres();
  const { schools } = useGetSchools();
  const { schoolYears } = useGetSchoolYears();
  const { result, loading, error } = useGetBookById(safeId);

  const [form, setForm] = useState<BookFormType>({
    title: "",
    author: null,
    genre: null,
    school: null,
    subject: null,
    schoolYear: null,
    description: null,
    conditionNote: null,
    price: 0,
    category: null,
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
        conditionNote: result.conditionNote || "",
        price: result.price ? result.price.toString() : "",
        category: result.category || "",
      });
    }
  }, [result]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Actualizando libro...");

    try {
      // Clonamos el formulario para limpiar los valores vacíos
      const cleanedForm = { ...form };
      
      Object.entries(cleanedForm).forEach(([key, value]) => {
      if (value === "") {
        cleanedForm[key as keyof typeof cleanedForm] = null;
      }
      });

      // Convertimos el price a número
      cleanedForm.price = Number(form.price);

      // Enviamos la actualización al backend
      await updateBook(safeId, cleanedForm);

      toast.dismiss(toastId);
      toast.success("Libro actualizado correctamente");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("Error al actualizar el libro");
    }
  };

  if (!safeId) return <p className="text-center text-red-500">ID inválido</p>;
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

             <select
              name="schoolYear"
              value={form.schoolYear}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
             >
              <option value="">Seleccioná el año escolar</option>
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              name="school"
              value={form.school}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Seleccioná un colegio</option>
                {schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
            </select>
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

            <textarea
              name="description"
              placeholder="(Opcional) Comentá brevemente de qué trata el libro."
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded resize-none"
              rows={4}
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
          name="conditionNote"
          placeholder="(Opcional) Comentá si el libro está escrito, subrayado o en qué estado se encuentra."
          value={form.conditionNote}
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

