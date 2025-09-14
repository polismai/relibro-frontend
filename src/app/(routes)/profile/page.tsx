"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthProvider";
import { useGetBooksByUser } from "../../../api/getBooksByUser";
import BookCardUser from "./components/book-card-user";
import { useEffect, useState } from "react";
import { getUser } from "@/api/getUser";
import { ProfileType } from "@/types/profile";

/* eslint-disable @next/next/no-img-element */
export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth(); 
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loadinProfile, setLoadingProfile] = useState(true);
  const { books, loading } = useGetBooksByUser(user?.id); 

  useEffect(() => {
    if (user?.id) {
      getUser(user.id)
        .then((data) => setProfile(data))
        .finally(() => setLoadingProfile(false));
    }
  }, [user?.id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mi cuenta</h1>

      {/* Datos del usuario */}
      <div className="mb-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Mis datos</h2>
        {loadinProfile ? (
          <p>Cragando datos...</p>
        ) : (
          <>
            <p><strong>Nombres:</strong> {profile?.firstName}</p>
            <p><strong>Apellidos:</strong> {profile?.lastName}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Número de contacto:</strong> {profile?.contactPhone || "-"}</p>
            <p><strong>Departamento:</strong> {profile?.department || "-"}</p>
            <button 
              onClick={() => router.push("/edit-profile")}
              className="mt-4 text-sm text-pink-600 hover:underline"
            >
                Editar perfil
            </button>
          </>
        )}
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
