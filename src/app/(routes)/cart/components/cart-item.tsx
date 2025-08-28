import { BookType } from "@/types/product";
import { useCart } from "../../../../hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import BookImage from "@/components/book-image";

interface CartItemProps {
  product: BookType;
}

const CartItem = (props: CartItemProps) => {
const { product } = props;
const { removeItem } = useCart();


  return (
    <li className="flex py-6 border-b">
      <BookImage id={product.id} url={product.images[0].url} title={product.title} />
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>
        </div>
        <div className="flex flex-col gap-6">
          <button className="mt-4 w-full px-4 py-2 rounded-xl border shadow-md text-sm font-medium text-gray-700 hover:scale-110 transition">
            Contactar al vendedor
          </button>
          <button
            className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}
          >
            <X size={20} onClick={() => removeItem(product.id)} />
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;