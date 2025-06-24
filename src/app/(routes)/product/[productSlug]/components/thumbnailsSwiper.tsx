/* eslint-disable @next/next/no-img-element */

import { BookImageType } from "@/types/product";
// import { useState } from "react";
import {
  Swiper,
  SwiperSlide
} from "swiper/react";
// import { Swiper as SwiperType } from "swiper/types";
import { Thumbs } from "swiper/modules";

interface ThumbnailsProps {
  images: BookImageType[];
}

const ThumbnailsSwiper = ({ images }: ThumbnailsProps) => {
  // const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="flex">
      <Swiper
          // onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="h-[500px]"
      >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.url}
                alt="thumbnail"
                className="w-full h-28 rounded object-cover cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  )
  
}

export default ThumbnailsSwiper;