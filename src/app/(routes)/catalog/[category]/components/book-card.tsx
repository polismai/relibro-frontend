/* eslint-disable @next/next/no-img-element */

import { Expand, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { BookType } from "@/types/product";
import IconButton from "@/components/icon-button";
import { GENRE_LABELS } from "@/types/genre";
import { useAuth } from "../../../../../../context/AuthProvider";
import { useAddBookOfInterest } from "@/api/addBookOfInterest";

type BookCardProps = {
  book: BookType;
};

export const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { addBookOfInterest } = useAddBookOfInterest();
  
  const mainImage = book.images[0]?.url || "/placeholder.jpg"; 

   const handleAddToInterest = async () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar en tu lista de interés");
      return;
    }
    
    await addBookOfInterest(book.id);
  };

  return (
    <div className="relative flex flex-col justify-start gap-y-2 h-[350px] transition-all duration-100 rounded-lg hover:shadow-md bg-white">
      
      {/* Badge */}
      <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4 w-full">
        {book.genre && (
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full w-fit">
            {GENRE_LABELS[book.genre as string]}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="relative group h-64 overflow-hidden rounded-t-xl">
        <img
          src={mainImage}
          alt={`Imagen del libro ${book.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={() => router.push(`/book/${book.id}`)}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={handleAddToInterest}
              icon={<Heart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      {/* Title & Price */}
      <div className="flex flex-col justify-end items-center p-4 space-y-2">
        <p className="text-lg text-center font-semibold">{book.title}</p>
        <p className="font-bold text-green-600 text-center">{formatPrice(book.price)}</p>
      </div>
    </div>
  );
};

export default BookCard;

