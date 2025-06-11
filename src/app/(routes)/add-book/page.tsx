"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { label: "ESCOLAR", value: "school" },
  { label: "LITERARIO", value: "story" },
];

export default function AddBookPage() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
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

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const res = await fetch("http://localhost:3001/api/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message.split("::")[1] || "Error al cargar el libro");
      }
      
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear el libro");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Agregar nuevo libro</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          name="author"
          placeholder="Autor"
          value={form.author}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="genre"
          placeholder="Género"
          value={form.genre}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

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

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

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
