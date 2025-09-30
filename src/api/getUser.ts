export async function getUser(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store", 
  });

   const result =  await res.json();

  if (!res.ok) {
    const msg = result?.message?.split("::")[1] || "Error al traer el usuario";
    throw new Error(msg);
  }
 
  return result;
}