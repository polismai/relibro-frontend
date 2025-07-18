/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetCategories } from "@/api/getCategories";
import { CategoryType } from "@/types/category";
import Link from "next/link";
import SkeletonSchema from "./skeletonSchema";

export const ChooseCategory = () => {
  const { categories, loading } = useGetCategories();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-center text-3xl sm:pb-8">Elige tu categoría favorita</h3>

      {loading && (
        <SkeletonSchema grid={2} />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {!loading && 
          categories?.map((category: CategoryType) => {

            return (
              <Link 
                key={category.value} 
                href={`/catalog/${category.value}`}
                aria-label={`Ir a la categoría ${category.label}`}
                className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
              >
                <img 
                  src={category.imageUrl}
                  alt={category.label}
                  className="max-w-[270px] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                />
                <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">{category.label}</p>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default ChooseCategory;