/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { BookImageType } from "@/types/product";
import {
  Swiper,
  SwiperSlide
} from "swiper/react";
import { Thumbs, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/lib/utils";

interface CarouselProductProps {
  images: BookImageType[];
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);



  return (
    <div className="flex flex-col sm:flex gap-4 px-6 sm:px-16">
  {/* Carrusel principal (común a ambos tamaños) */}
      <div className="w-full sm:flex-1 order-1 sm:order-none">
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs, Pagination]}
          className="w-full h-[400px] sm:h-[500px]"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.url}
                alt="Main image"
                className="w-full h-full object-contain rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Miniaturas en horizontal (solo en mobile) */}
        <div className="flex sm:hidden mt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            modules={[Thumbs]}
            className="w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={img.id}>
                <div className="w-full h-32 flex items-center justify-center overflow-hidden bg-white rounded cursor-pointer">
                  <img
                    src={img.url}
                    alt="thumbnail"
                    className={cn(
                      "max-h-full max-w-full object-contain",
                      activeIndex === index
                        ? ""
                        : "opacity-50 hover:opacity-100 transition"
                    )}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Miniaturas verticales (solo en desktop) */}
      <div className="hidden sm:flex w-32 items-center justify-center">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          modules={[Thumbs]}
          className="h-[500px]"
        >
          {images.map((img, index) => (
            <SwiperSlide key={img.id}>
              <div className="w-full h-32 flex items-center justify-center overflow-hidden bg-white rounded cursor-pointer">
                <img
                  src={img.url}
                  alt="thumbnail"
                  className={cn(
                    "max-h-full max-w-full object-contain",
                    activeIndex === index
                      ? ""
                      : "opacity-50 hover:opacity-100 transition"
                  )}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselProduct;






