/* eslint-disable @next/next/no-img-element */
import { updateBook } from "@/api/updateBook";
import { Button } from "@/components/ui/button";
import { BookType } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function BookCardUser({ book }: { book: BookType }) {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(book.isAvailable);
  
  const handleToggleAvailability = async () => {
    const newAvailability = !isAvailable;

    const toastId = toast.loading(
      newAvailability ? "Marcando como disponible..." : "Marcando como vendido..."
    );

    try {
      await updateBook(book.id, { isAvailable: newAvailability });
      setIsAvailable(newAvailability);
      toast.success(
        newAvailability ? "Libro marcado como disponible" : "Libro marcado como vendido"
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el estado del libro");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div key={book.id} className="border rounded-lg p-4 shadow-sm">
      <img
        src={book.images[0]?.url || "/placeholder.jpg"}
        alt={book.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">${book.price}</p>
      <div className="mt-2 flex gap-2">
        <Button variant="outline" onClick={() => router.push(`/edit-book/${book.id}`)}>
          Editar
        </Button>
        <div
          onClick={handleToggleAvailability}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium cursor-pointer select-none transition
            ${isAvailable ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-200 text-gray-600"}
          `}
          title={isAvailable ? "Hacé clic para marcar como vendido" : "Ya está marcado como vendido"}
        >
          <span className="text-lg">{isAvailable ? "🟢" : "🔴"}</span>
          {isAvailable ? "Disponible" : "Vendido"}
        </div>
      </div>
    </div>
  )
}

export default BookCardUser;
