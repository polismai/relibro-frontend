import { User } from "@/types/user";

export async function updateProfile(userId: string, data: Partial<User>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message?.split("::")[1] || "Error al actualizar el perfil");
  }

  return result;
}