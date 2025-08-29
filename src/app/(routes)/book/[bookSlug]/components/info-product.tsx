import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { formatPrice } from "@/lib/formatPrice";
import { GENRE_LABELS } from "@/types/genre";
import { BookType } from "@/types/product";

// import { useCart } from "../../../../../../hooks/use-cart";
// import { useLovedProducts } from "../../../../../../hooks/use-loved-products";

export type InfoProductProps = {
  product: BookType
}

const InfoProduct = (props: InfoProductProps) => {
const { product } = props;
const { handleAddToCart } = useAddToCart();

// const { addItem } = useCart();
// const { addLovedItem } = useLovedProducts();

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product.title}</h1>
        <div className="flex items-center justify-between gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full w-fit">
            {GENRE_LABELS[product.genre as string]}
          </p>
        </div>
      </div>
      
      {product.description && (
        <>
          <Separator className="my-4" />
          <p>{product.description}</p>
        </>
      )}

      {product.conditionNote && (
        <>
          <Separator className="my-4" />
          <p>{product.conditionNote}</p>
        </>
      )}

      <Separator className="my-4" />
      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
      <Button className="w-full" onClick={() => handleAddToCart(product)} >
        Me interesa
      </Button>
    </div>
  );
}

export default InfoProduct;