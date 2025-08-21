/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLogin } from "@/api/login";
import Link from "next/link";
import { validation } from "./validation";

export type Errors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
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

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        {errorsInput.password && <p>{errorsInput.password}</p>}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
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
        onClick={() => window.location.href = "/api/auth/login?connection=google-oauth2"}
        className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
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
