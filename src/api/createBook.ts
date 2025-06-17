import { CreateBookForm } from "@/types/createBookForm";

export async function createBook(form: CreateBookForm, images: FileList | null) {
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  if (images) {
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message.split("::")[1] || "Error al cargar el libro");
  }

  return await res.json();
}