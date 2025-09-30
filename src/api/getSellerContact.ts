import { cookies } from "next/headers";

export type SellerContact = {
  firstName: string;
  lastName: string;
  contactPhone: string;
  department: string;
};

export async function getSellerContact(bookId: string): Promise<SellerContact> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}/contact`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      cache: "no-store", 
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.message?.split("::")[1] || `Failed to fetch seller contact (status: ${res.status})`;
      throw new Error(msg);
    }

    return data;
  } catch (error) {
    console.error("Error fetching seller contact:", error);
    throw error;
  }
}
