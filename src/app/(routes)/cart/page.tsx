/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "../../../hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { X } from "lucide-react";

const CartPage = () => {
  const { items, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Tu lista de libros está vacía</h2>
        <p className="text-gray-600">Agrega libros para contactar a los vendedores.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Tus libros guardados</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative"
          >
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition flex items-center justify-center"
              onClick={() => removeItem(product.id)}
            >
              <X size={18} />
            </button>

            {/* Imagen */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={product.images[0]?.url || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info del libro */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-green-600 font-semibold mt-1">{formatPrice(product.price)}</p>
              </div>

              {/* Boton de contacto */}
              <div className="mt-4">
                <button className="w-full px-3 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                  Contactar al vendedor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;