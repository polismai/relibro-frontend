export async function updateContactPhone(userId: string, contactPhone: string) {
  try {
    const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ contactPhone }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Error al actualizar el teléfono');
    }

    const updatedUser = await res.json();
    return updatedUser;
  } catch (err) {
    console.error('Error updating contact phone:', err);
    throw err;
  }
}