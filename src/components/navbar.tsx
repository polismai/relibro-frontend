"use client";

import { ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="bg-stone-300 w-full">
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-7xl">
        <h1 className="text-3xl" onClick={() => router.push("/")}>
          Re<span className="font-bold">Libro</span>
        </h1>

        <div className="flex items-center gap-4 sm:gap-7">
          {user && <span className="text-sm">Hola, {user.firstName}</span>}

          <User
            strokeWidth="1"
            className="cursor-pointer hover:text-white transition-colors"
            aria-label="Perfil del usuario"
            onClick={() => router.push("/profile")}
          />

          <ShoppingCart
            strokeWidth="1"
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => router.push("/cart")}
            aria-label="Ir al carrito"
          />

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