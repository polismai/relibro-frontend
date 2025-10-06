export const deleteBookOfInterest = async (bookId: string) => {
  try {
    const res = await fetch(`http://localhost:3001/api/interests/${bookId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error al eliminar libro de interés");
    }

    return await res.json();
  } catch (error) {
    console.error("deleteBookOfInterest error:", error);
    throw error;
  }
};
