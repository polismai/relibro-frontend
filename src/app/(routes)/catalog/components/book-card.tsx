/* eslint-disable @next/next/no-img-element */
// import { formatPrice } from "@/lib/formatPrice";
// import { ProductType } from "@/types/product";
// import Link from "next/link";

// interface BookCardProps {
//   book: ProductType;
// }

// const BookCard = ({ book }: BookCardProps) => {
//   const mainImage = book.images[0]?.url;

//   return (
//     <Link href={`/product/${book.id}`}>
//       <div className="p-4 border rounded-lg shadow hover:shadow-md transition">
//         <img
//           src={mainImage}
//           alt={book.title}
//           className="object-cover w-full h-48 rounded"
//         />
//         <h2 className="mt-4 text-lg font-semibold">{book.title}</h2>
//         <p className="text-sm text-gray-600">{book.author}</p>
//         <p className="mt-2 font-bold">{formatPrice(book.price)}</p>
//       </div>
//     </Link>
//   );
// };

// export default BookCard;

import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/useAddToCart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import IconButton from "@/components/icon-button";

type BookCardProps = {
  book: ProductType;
};

export const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();
  const { handleAddToCart } = useAddToCart();

  const mainImage = book.images[0]?.url || "/placeholder.jpg"; 

  return (
    <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md">
      <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
        <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
          {book.genre}
        </p>
        <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
          {book.category}
        </p>
      </div>

      <div className="relative group">
        <img
          src={mainImage}
          alt={`Imagen del libro ${book.title}`}
          className="w-full rounded-xl object-cover"
        />

        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={() => router.push(`/product/${book.id}`)}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => handleAddToCart(book)}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      <p className="mt-4 text-2xl text-center">{book.title}</p>
      <p className="font-bold text-center text-green-600">{formatPrice(book.price)}</p>
    </div>
  );
};

export default BookCard;

