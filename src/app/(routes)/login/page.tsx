/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLogin } from "@/api/login";
import Link from "next/link";
import { validation } from "./validation";
import { Eye, EyeOff } from "lucide-react";
import { RiGoogleFill } from "react-icons/ri";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";

export type Errors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorsInput, setErrorsInput] = useState<Errors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    setForm(updatedForm);
    setErrorsInput(validation(updatedForm));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginHandler(form, redirectTo, setError, setLoading);
  };

  const loginWithGoogle= async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
    } catch (error) {
      console.error("Google login error", error);
      throw error;
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("✅ Logged in:", user);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message.split("::")[1] || "User not registered");
      }
    } catch (err) {
      console.error("❌ Error in Google login", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        {errorsInput.email && <p>{errorsInput.email}</p>}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        
        {errorsInput.password && <p>{errorsInput.password}</p>}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || Object.keys(errorsInput).length > 0}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">o</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <RiGoogleFill />
        Ingresar con Google
      </button>

      <div className="text-center text-sm mt-4">
        ¿Todavía no tenés cuenta?{" "}
        <Link href="/register" className="text-pink-600 font-medium hover:underline">
          Registrate
        </Link>
      </div>
    </div>
  );
}
