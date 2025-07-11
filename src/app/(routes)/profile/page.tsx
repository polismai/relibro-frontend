"use client";

import { useAuth } from "../../../../context/AuthProvider";
import { useGetBooksByUser } from "../../../api/getBooksByUser";
import BookCardUser from "./components/book-card-user";

/* eslint-disable @next/next/no-img-element */
export default function ProfilePage() {
  const { user } = useAuth(); 
  const { books, loading } = useGetBooksByUser(user?.id); 

  // useEffect(() => {
  //   if (!user) {
  //     toast.info("Tenés que iniciar sesión para acceder a tu cuenta.");
  //     router.push("/login?redirect=/profile");
  //   }
  // }, [user, router]);

  // if (!user) return null; 

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
             <BookCardUser key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
