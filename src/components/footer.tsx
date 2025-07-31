"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "sonner";

const dataFooter = [
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
    name: "Mi cuenta",
    link: "/profile"
  },
]

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();       
  
  return (
    <footer className="mt-4">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p>Re
            <span className="font-bold">Libro</span>
          </p>

          <ul className="flex flex-wrap items-center mb-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {dataFooter.map((data) => (
              <li key={data.id}>
                {data.name === "Mi cuenta" ? (
                  <button
                    className="hover:underline me-4 md:me-6 text-sm text-gray-500 dark:text-gray-400"
                    onClick={() => {
                      if (!user) {
                        toast.info("Tenés que iniciar sesión para acceder a tu cuenta.");
                        router.push("/login?redirect=/profile");
                      } else {
                        router.push("/profile");
                      }
                    }}
                  >
                    {data.name}
                  </button>
                ) : (
                  <Link 
                    href={data.link} 
                    className={`hover:underline me-4 md:me-6 ${
                      pathname === data.link ? "font-bold underline" : ""
                    }`}
                    aria-current={pathname === data.link ? "page" : undefined}
                  >
                    {data.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4"/>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          &copy; 2025
          Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
}

export default Footer;