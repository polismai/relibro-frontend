import { BookType } from "@/types/product";

export async function updateBook(id: string, data: Partial<BookType>) {
  const res = await fetch(`http://localhost:3001/api/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Este es el error", errorData)
    throw new Error(errorData.message.split("::")[1] || "Error al actualizar el libro");
  }

  return res.json();
}