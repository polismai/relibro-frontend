import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { GENRE_LABELS } from "@/types/genre";
import { BookType } from "@/types/product";
import { useAuth } from "../../../../../../context/AuthProvider";
import { useAddBookOfInterest } from "@/api/addBookOfInterest";

export type InfoProductProps = {
  product: BookType
}

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { user } = useAuth();
  const { addBookOfInterest, loading } = useAddBookOfInterest();

  const handleAddToInterest = async () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar en tu lista de interés");
      return;
    }

    await addBookOfInterest(product.id);
  };

  console.log("Renderizando InfoProduct con product:", product);
  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product.title}</h1>

        {product.genre && (
          <div className="flex items-center justify-between gap-3">
            <p className="px-2 py-1 text-xs text-white bg-black rounded-full w-fit">
              {GENRE_LABELS[product.genre as string]}
            </p>
          </div>
        )}
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
      <button
        className="w-full bg-black text-white py-2 rounded" 
        disabled={loading}
        onClick={handleAddToInterest} 
      >
          {loading ? 'Agregando...' : 'Me interesa'}
      </button>
    </div>
  );
}

export default InfoProduct;