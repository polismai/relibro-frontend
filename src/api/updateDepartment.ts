export async function updateDepartment(userId: string, department: string) {
  try {
    const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ department }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Error al actualizar el departamento');
    }

    const updatedUser = await res.json();
    return updatedUser;
  } catch (err) {
    console.error('Error updating department:', err);
    throw err;
  }
}