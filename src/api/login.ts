import { useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useCallback(async (form: { email: string; password: string }, redirectTo: string, setError: (msg: string) => void, setLoading: (loading: boolean) => void) => {
    const toastId = toast.loading("Iniciando sesión...");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        const msg = data?.message?.split("::")[1] || "Credenciales incorrectas";
        throw new Error(msg);
      }

      login(data.user);

      toast.success("Sesión iniciada con éxito", {
        description: `Bienvenida, ${data.user.firstName}`,
        duration: 3000,
      });

      router.push(redirectTo);
    } catch (err) {
      toast.dismiss(toastId); 

      const error = err as Error;
      console.error(error);
      setError(error.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [login, router]);
};
