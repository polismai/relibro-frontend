/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductImageType } from "@/types/product";

interface CarouselProductProps {
  images: ProductImageType[];
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;

  return (
    <div className="sm:px-16 ">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <img 
                src={image.url} 
                alt="Image product"
                className="rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CarouselProduct;