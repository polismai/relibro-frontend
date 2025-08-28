"use client";

import { Heart, User } from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";

const dataNavbar = [
  {
    id: 1,
    name: "Sobre nosotros",
    link: "/about"
  },
  {
    id: 2,
    name: "Catálogo",
    link: "/catalog"
  },
  {
    id: 3,
    name: "Cómo funciona ReLibro",
    link: "/how-it-works"
  },
]

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const cart = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-stone-300 w-full relative z-50">
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-7xl">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl" onClick={() => router.push("/")}>
            Re<span className="font-bold">Libro</span>
          </h1>
          {/* Botón menú hamburguesa (solo en mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          <ul className="hidden md:flex items-center text-sm font-medium">
            {dataNavbar.map((data) => (
              <li key={data.id}>
                <Link 
                  href={data.link} 
                  className={`hover:underline me-4 md:me-6 ${
                    pathname === data.link ? "font-bold underline" : ""
                  }`}
                  aria-current={pathname === data.link ? "page" : undefined}
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isOpen && (
          <ul className="md:hidden absolute top-full left-0 w-full shadow-lg px-4 py-3 flex flex-col gap-3 text-lg font-medium border-t border-gray-200 bg-white">
            {dataNavbar.map((data) => (
              <li key={data.id}>
                <Link
                  href={data.link}
                  onClick={() => setIsOpen(false)} // Cierra el menú al hacer click
                  className={`block py-2 hover:underline ${
                    pathname === data.link ? "font-bold underline" : ""
                  }`}
                  aria-current={pathname === data.link ? "page" : undefined}
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      
        <div className="flex items-center gap-2 sm:gap-7">
          
          <User
            strokeWidth="1"
            className="cursor-pointer hover:text-white transition-colors"
            aria-label="Perfil del usuario"
            onClick={() => {
              if (!user) {
                toast.info("Tenés que iniciar sesión para ver tu perfil.");
                router.push("/login?redirect=/profile");
              } else {
                router.push("/profile");
              }
            }}
          />

          {user && (
            <span className="text-sm">
              Hola, {user.firstName}
            </span>
          )}

          {cart.items.length === 0 ? 
           <Heart
            strokeWidth="1"
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => router.push("/cart")}
            aria-label="Ir a seleccionados"
          />
          : (
            <div 
              className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
              onClick={() => router.push("/cart")}
            >
              <Heart
                strokeWidth="1"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
                aria-label="Ir a seleccionados"
              />
              <span className="text-sm">{cart.items.length}</span>
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