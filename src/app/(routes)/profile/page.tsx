"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../../../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useGetBooksByUser } from "../../../api/getBooksByUser";
import { useEffect } from "react";
import { toast } from "sonner";

/* eslint-disable @next/next/no-img-element */
export default function ProfilePage() {
  const { user } = useAuth(); 
  const router = useRouter();
  const { books, loading } = useGetBooksByUser(user?.id); 

  useEffect(() => {
    if (!user) {
      toast.info("Tenés que iniciar sesión para acceder a tu cuenta.");
      router.push("/login?redirect=/profile");
    }
  }, [user, router]);

  if (!user) return null; 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mi cuenta</h1>

      {/* Datos del usuario */}
      <div className="mb-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Mis datos</h2>
        <p><strong>Nombre:</strong> {user?.firstName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button className="mt-4 text-sm text-pink-600 hover:underline">
          Editar perfil
        </button>
      </div>

      {/* Libros publicados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Mis libros publicados</h2>

        {loading ? (
          <p>Cargando libros...</p>
        ) : books.length === 0 ? (
          <p>No tenés libros publicados aún.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={book.images[0]?.url || "/placeholder.jpg"}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">${book.price}</p>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" onClick={() => router.push(`/edit-book/${book.id}`)}>
                    Editar
                  </Button>
                  <Button variant="destructive">Vendido</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
