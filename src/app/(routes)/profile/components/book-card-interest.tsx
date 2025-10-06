import { BookType } from "@/types/product";

/* eslint-disable @next/next/no-img-element */
function BookCardInterest({ book }: { book: BookType }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">${book.price}</p>

      {/* Info del vendedor */}
      <div className="mt-3 text-sm text-gray-700">
        <p><strong>Vendedor:</strong> {book.user?.firstName}</p>
        <p><strong>Contacto:</strong> {book.user?.contactPhone || "-"}</p>
        <p><strong>Email:</strong> {book.user?.email}</p>
      </div>
    </div>
  )
}

export default BookCardInterest;