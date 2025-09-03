import { useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import loginWithGoogle from "@/lib/googleAuth";

export const useGoogleLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useCallback(async (redirectTo: string, setError: (msg: string) => void, setLoading: (loading: boolean) => void) => {
    const toastId = toast.loading("Iniciando sesión con Google...");
    setError("");
    setLoading(true);

    try {
      const googleUser = await loginWithGoogle();
      console.log("✅ Logged in:", googleUser);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: googleUser.email, name: googleUser.name, }),
        credentials: "include",
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        const msg = data?.message?.split("::")[1] || "No pudimos iniciar sesión conn Google";
        throw new Error(msg);
      }

      login(data.user);

      toast.success("Sesión iniciada con Google", {
        description: `Bienvenida/o, ${data.user.firstName}`,
        duration: 3000,
      });

      router.push(redirectTo);
    } catch (err) {
      toast.dismiss(toastId); 

      const error = err as Error;
      console.error("❌ Error Google login:", error);
      setError(error.message || "Error desconocido con Google");
    } finally {
      setLoading(false);
    }
  }, [login, router]);
};