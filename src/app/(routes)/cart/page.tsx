/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetBooksOfInterest } from "@/api/getBooksOfInterest";
import { formatPrice } from "@/lib/formatPrice";
import { X } from "lucide-react";
import { useAuth } from "../../../../context/AuthProvider";
import { deleteBookOfInterest } from "@/api/deleteBookOfInterest";
import { useState } from "react";
import SellerInfo from "./components/seller-info";


const CartPage = () => {
  const { user } = useAuth(); 
  const { interestedBooks } = useGetBooksOfInterest(user?.id);
  const [openContacts, setOpenContacts] = useState<string[]>([]);

  const toggleContact = (bookId: string) => {
    setOpenContacts((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  if (interestedBooks.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Tu lista de libros está vacía</h2>
        <p className="text-gray-600">Agrega libros para contactar a los vendedores.</p>
      </div>
    );
  }

  const handleRemoveInterest = async (bookId: string) => {
    try {
      await deleteBookOfInterest(bookId);
    } catch (error) {
      console.error("Error eliminando interés:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Mis libros de interés</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {interestedBooks.map((interest) => (
          <div
            key={interest.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative"
          >
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition flex items-center justify-center"
              onClick={() => handleRemoveInterest(interest.id)}
            >
              <X size={18} />
            </button>

            {/* Info del libro */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold">{interest.book.title}</h2>
                <p className="text-green-600 font-semibold mt-1">{formatPrice(interest.book.price)}</p>
              </div>

             <div className="mt-4">
                <button 
                  className="w-full px-3 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => toggleContact(interest.book.id)}
                >
                  {openContacts.includes(interest.book.id)
                    ? "Ocultar contacto"
                    : "Ver contacto"}
                </button>

                {openContacts.includes(interest.book.id) && (
                  <SellerInfo seller={interest.book.user} />
                )}
              </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;