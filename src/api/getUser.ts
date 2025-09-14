export async function getUser(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store", // opcional: evita cache en SSR/ISR
  });

  if (!res.ok) {
    throw new Error("Error fetching user");
  }

  const result =  await res.json();
  return result;
}