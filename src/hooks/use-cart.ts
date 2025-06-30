import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { BookType } from "@/types/product";

import { toast } from '@/hooks/use-toast';

interface CartStore {
  items: BookType[];
  addItem: (data: BookType) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: BookType) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id === data.id)

    if (existingItem) {
      return toast({
        title: "El libro ya existe en el carrito",
        variant: "destructive"
      })
    }

    set({
      items: [...get().items, data]
    })
    toast({
      title: "Libro añadido al carrito"
    })
  },
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => (item.id) !== id)]})
    toast({
      title: "Libro eliminado del carrito"
    })
  },
  removeAll: () => set({ items: [] })
}), {
  name: "cart-storage",
  storage: createJSONStorage(() => localStorage)
})) 