/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import Link from "next/link";

interface Props {
  book: ProductType;
}

const BookCard = ({ book }: Props) => {
  const mainImage = book.images[0]?.url;

  return (
    <Link href={`/product/${book.id}`}>
      <div className="p-4 border rounded-lg shadow hover:shadow-md transition">
        <img
          src={mainImage}
          alt={book.title}
          className="object-cover w-full h-48 rounded"
        />
        <h2 className="mt-4 text-lg font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="mt-2 font-bold">{formatPrice(book.price)}</p>
      </div>
    </Link>
  );
};

export default BookCard;
