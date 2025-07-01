/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

interface ProductImageProps {
  id: string;
  title: string;
  url: string;
}

const ProductImage = (props: ProductImageProps) => {
  const { id, url, title } = props;
  const router = useRouter();
  
  return (
    <div onClick={() => router.push(`/product/${id}`)} className="cursor-pointer">
      <img 
        src={`${url}`}
        alt={`${title}`}
        className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
      />
    </div>
  );
}

export default ProductImage;