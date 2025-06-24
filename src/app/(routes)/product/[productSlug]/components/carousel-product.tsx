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

interface CarouselProductProps {
  images: BookImageType[];
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="grid sm:grid-cols-3">
      {/* Thumbnails verticales */}
      <div className="hidden sm:block w-24">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          modules={[Thumbs]}
          className="h-[500px]"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.url}
                alt="thumbnail"
                className="rounded object-cover w-full h-24 cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Carrusel principal */}
      <div className="sm:col-span-2">
        <Swiper
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs, Pagination]}
          className="h-[500px]"
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
      </div>
    </div>
  );
};

export default CarouselProduct;






