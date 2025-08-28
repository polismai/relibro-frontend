"use client";

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
  {
    id: 1,
    title: "VUELTA A CLASES",
    description: "Libros usados en excelente estado y con descuentos imperdibles.",
    imageUrl: "/images/colegio.jpg",
    link: "/catalog/school"
  },
  {
    id: 2,
    title: "Cuidamos el planeta",
    description: "Al comprar libros usados, reducís tu huella ecológica.",
    imageUrl: "/images/planeta.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Un libro usado, un árbol salvado",
    description: "Se talan 24 árboles por cada tonelada de papel. ¡Elegí reutilizar libros y hacé la diferencia!",
    imageUrl: "/images/bosque.jpg",
    link: "#"
  },
]

export const CarouselTextBanner= () => {
  const router = useRouter();

  return (
    <div className="bg-neutral-50 pt-6">
      <Carousel 
        className="w-full sm:max-w-4xl md:max-w-7xl mx-auto" 
        plugins={[
          Autoplay({
            delay: 6000
          })
        ]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link, description, imageUrl }) => (
            <CarouselItem key={id} className="relative h-[200px] sm:h-[400px]">
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="rounded-md brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <p className="text-lg sm:text-2xl font-semibold">{title}</p>
                <p className="text-sm sm:text-base">{description}</p>
              </div>
            </CarouselItem>
          ))}
       </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CarouselTextBanner;
     