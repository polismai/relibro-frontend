'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthProvider';
import { BookType } from '@/types/product';

export function useAddToCart() {
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = (book: BookType) => {
    if (!user) {
      toast.info("Tenés que iniciar sesión para agregar libros al carrito.");
      router.push(`/login?redirect=/product/${book.id}`);
      return;
    }

    // 👉 Lógica real para agregar al carrito:
    // Podés usar context, redux o un endpoint
    console.log("Agregar al carrito:", book);
    toast.success("Libro agregado al carrito");
  };

  return { handleAddToCart };
}
