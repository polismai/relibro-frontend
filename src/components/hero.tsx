// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";

// const Hero = () => {
//   const router = useRouter();

//   return (
//      <section className="bg-gray-100 py-16 px-6 sm:px-10 text-center">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-4">
//           Reencontrá tu próximo <span className="text-pink-500">libro favorito</span>
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-600 mb-8">
//           Libros usados, historias nuevas. Comprá o vendé fácil desde un solo lugar.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <Button 
//             className="px-6 py-3 text-lg" 
//             onClick={() => router.push("/books")}
//           >
//             Explorar catálogo
//           </Button>
//           <Button 
//             variant="outline" 
//             className="px-6 py-3 text-lg" 
//             onClick={() => router.push("/sell")}
//           >
//             Vender un libro
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "sonner";

const Hero = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleSellClick = () => {
    if (!user) {
      toast.info("Necesitás iniciar sesión para vender un libro.");
      router.push("/login?redirect=/add-book");
    } else {
      router.push("/add-book");
    }
  };

  return (
    <section className="bg-neutral-50 py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Reencontrá tu próximo <span className="text-green-600">libro favorito</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Libros usados, historias nuevas. Comprá o vendé fácil desde un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button className="px-6 py-3 text-lg" onClick={() => router.push("/catalog")}>
              Explorar catálogo
            </Button>
            <Button variant="outline" className="px-6 py-3 text-lg" onClick={handleSellClick}>
              Vender un libro
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/hero_books.png" 
            alt="Libros usados"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;