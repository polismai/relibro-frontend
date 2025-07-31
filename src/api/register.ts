export async function registerUser(data: {
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json();
  
  if (!res.ok) {
    throw new Error(result.message || 'Error en el registro')
  }

  return result;
}
