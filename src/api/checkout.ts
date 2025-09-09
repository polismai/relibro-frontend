"use client";

import { useState } from "react";
import { toast } from "sonner";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async ({ userId }: { userId: string }) => {
    const toastId = toast.loading("Redirigiendo al pago...");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al crear la preferencia");
      }

      toast.dismiss(toastId);
      toast.success("Redirigiendo a Mercado Pago...");

      // Redirigir al checkout de Mercado Pago
      window.location.href = data.init_point;
    } catch (err) {
      toast.dismiss(toastId);
      console.error("❌ Error al iniciar pago:", err);
      toast.error("Hubo un error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return { handleCheckout, loading };
};
