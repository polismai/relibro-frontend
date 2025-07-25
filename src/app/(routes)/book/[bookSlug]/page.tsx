"use client";

import { useGetBookById } from "@/api/getBookById";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default function Page() {
  const { bookSlug } = useParams();
  const safeBookSlug = typeof bookSlug === "string" ? bookSlug : "";

  const { result } = useGetBookById(safeBookSlug);

  if (result === null) {
    return <SkeletonProduct />
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="sm:grid sm:grid-cols-3 gap-8">
        {/* Sección de imágenes */}
        <div className="sm:col-span-2">
          <CarouselProduct images={result.images} />
        </div>

        {/* Info del producto */}
        <div className="sm:col-span-1">
          <InfoProduct product={result} />
        </div>
      </div>
    </div>
  );
}