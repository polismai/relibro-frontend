"use client";

import { BaggageClaim, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "@/hooks/use-cart";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const cart = useCart();

  return (
    <div className="bg-stone-300 w-full">
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-7xl">
        <h1 className="text-3xl" onClick={() => router.push("/")}>
          Re<span className="font-bold">Libro</span>
        </h1>

        <div className="flex items-center gap-2 sm:gap-7">
          
          <User
            strokeWidth="1"
            className="cursor-pointer hover:text-white transition-colors"
            aria-label="Perfil del usuario"
            onClick={() => router.push("/profile")}
          />

          {user && (
            <span className="text-sm">
              Hola, {user.firstName}
            </span>
          )}

          {cart.items.length === 0 ? 
           <ShoppingCart
            strokeWidth="1"
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => router.push("/cart")}
            aria-label="Ir al carrito"
          />
          : (
            <div className="flex gap-1" onClick={() => router.push("/cart")}>
              <BaggageClaim 
                strokeWidth="1"
                className="cursor-pointer hover:text-white transition-colors"
                aria-label="Ir al carrito"
              />
              <span>{cart.items.length}</span>
            </div>
          )}
         
          {user ? (
          <button className="text-sm hover:underline" onClick={logout}>
            Cerrar sesión
          </button>
          ) : (
          <button className="text-sm hover:underline" onClick={() => router.push("/login")}>
            Iniciar sesión
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;