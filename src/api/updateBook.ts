import { BookType } from "@/types/product";

export async function updateBook(id: string, data: Partial<BookType>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message.split("::")[1] || "Error al actualizar el libro");
  }

  console.log("Respuesta del backend", result)
  return result;
}