"use client";

import { useGetDepartments } from "@/api/getDepartments";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/api/updateProfile";
import { getUser } from "@/api/getUser";

export default function EditProfilePage() {
  const router = useRouter();
  const { departments } = useGetDepartments();
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactPhone: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getUser(user.id)
        .then((data) => setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          contactPhone: data.contactPhone || "",
          department: data.department || "",
        }))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        // Enviamos la actualización al backend
        await updateProfile(user.id, form);
        toast.success("Perfil actualizado correctamente");
        router.push("/profile");
      } catch (err) {
        console.error(err);
        toast.error("Error al actualizar el perfil");
      }
    };

    if (loading) return <p>Cargando perfil...</p>;

    return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Actualizar perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="firstName"
          placeholder="Nombre"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
  
        <input
          name="lastName"
          placeholder="Apellidos"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="contactPhone"
          placeholder="Número de contacto"
          value={form.contactPhone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Seleccioná el departamento</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}