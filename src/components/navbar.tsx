"use client";

import { ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="bg-stone-300 w-full">
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-7xl">
        <h1 className="text-3xl" onClick={() => router.push("/")}>Re
          <span className="font-bold">Libro</span>
        </h1>
      
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        <ShoppingCart 
          strokeWidth="1" 
          className="cursor-pointer hover:text-white transition-colors" 
          onClick={() => router.push("/cart")} 
          aria-label="Ir al carrito"
        />

        <User 
          strokeWidth="1" 
          className="cursor-pointer hover:text-white transition-colors"
          aria-label="Perfil del usuario"
        />
      </div>
      </div>
    </div>
  );
}

export default Navbar;