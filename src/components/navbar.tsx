"use client";

import { BaggageClaim, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import Link from "next/link";

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

  return (
    <div className="bg-stone-300 w-full">
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-7xl">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl" onClick={() => router.push("/")}>
            Re<span className="font-bold">Libro</span>
          </h1>
          <ul className="flex flex-wrap items-center mb-4 text-sm font-medium sm:mb-0">
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