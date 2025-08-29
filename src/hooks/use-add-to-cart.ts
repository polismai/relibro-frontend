'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthProvider';
import { BookType } from '@/types/product';
import { useCart } from './use-cart';

export function useAddToCart() {
  const { user } = useAuth();
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (book: BookType) => {
    if (!user) {
      toast.info("Tenés que iniciar sesión para agregar libros a la lista.");
      router.push(`/login?redirect=/book/${book.id}`);
      return;
    }

    addItem(book);
    
    toast.success("Libro agregado a la lista");
  };

  return { handleAddToCart };
}

