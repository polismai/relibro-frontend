"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBook } from "@/api/createBook";
import { useGetCategories } from "@/api/getCategories";
import { useGetGenres } from "@/api/getGenres";
import { useGetSchools } from "@/api/getSchools";
import { useGetSchoolYears } from "@/api/getSchoolYears";
import { validation } from "./validation";
import { updateContactPhone } from "@/api/updateContactPhone";

export type Errors = {
    title?: string;
    author?: string;
    genre?: string;
    school?: string;
    subject?: string;
    schoolYear?: string;
    description?: string;
    conditionNote?: string;
    price?: string;
    category?: string;
}

export default function AddBookPage() {
  const { categories } = useGetCategories();
  const { genres } = useGetGenres();
  const { schools } = useGetSchools();
  const { schoolYears } = useGetSchoolYears();
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    school: "",
    subject: "",
    schoolYear: "",
    description: "",
    conditionNote: "",
    price: "",
    category: "",
  });

  const [contactPhone, setContactPhone] = useState(user?.contactPhone || "");
  const needsPhone = !user?.contactPhone;
  const [errors, setErrors] = useState<Errors>({});
  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setErrors(validation(updatedForm));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Cargando libro...");

    try {
      if (user && needsPhone && contactPhone.trim()) {
        await updateContactPhone(user.id, contactPhone);
      }


      const payload = {
        ...form,
        school: form.school === "" ? null : form.school,
        schoolYear: form.schoolYear === "" ? null : form.schoolYear,
      };

      await createBook(payload, images);
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
        {errors.category && <p>{errors.category}</p>}
        
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        {errors.title && <p>{errors.title}</p>}
          
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

            <select
              name="schoolYear"
              value={form.schoolYear}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
             >
              <option value="">Seleccioná el año escolar</option>
              {schoolYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
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
                <option key={school.id} value={school.id}>
                  {school.name}
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
            {errors.author && <p>{errors.author}</p>}

            <textarea
              name="description"
              placeholder="(Opcional) Comentá brevemente de qué trata el libro."
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded resize-none"
              rows={4}
            />
            {errors.description && <p>{errors.description}</p>}

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
        {errors.conditionNote && <p>{errors.conditionNote}</p>}

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
        {errors.price && <p>{errors.price}</p>}

        {needsPhone && (
          <div className="mb-4 p-3 bg-gray-50 rounded border">
            <label className="block mb-2 font-semibold">Número de contacto</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Ej: +598 9 123 4567"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        )}

        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="block text-sm"
        />

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Cargar libro
        </button>
      </form>
    </div>
  );
}
