"use client";

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
  {
    id: 1,
    title: "Encontrá joyitas a precios únicos",
    description: "Libros usados en excelente estado y con descuentos imperdibles.",
    link: "/catalog"
  },
  {
    id: 2,
    title: "Cuidamos el planeta",
    description: "Al comprar libros usados, reducís tu huella ecológica.",
    link: "#"
  },
  {
    id: 3,
    title: "Un libro usado, un árbol salvado",
    description: "Se talan 24 árboles por cada tonelada de papel. ¡Elegí reutilizar libros y hacé la diferencia!",
    link: "#"
  },
  {
    id: 4,
    title: "Comprar novedades",
    description: "Todas las novedades al 50% de descuento",
    link: "#"
  },
]

export const CarouselTextBanner= () => {
  const router = useRouter();

  return (
    <div className="bg-stone-200 dark:bg-primary">
      <Carousel 
        className="w-full max-w-4xl mx-auto" 
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link, description }) => (
            <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                    <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
       </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CarouselTextBanner;
     