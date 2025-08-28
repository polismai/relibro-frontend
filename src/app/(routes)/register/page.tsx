'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { registerUser } from '@/api/register'
import { validation } from './validation'
import { Eye, EyeOff } from 'lucide-react'

export type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setErrors(validation(updatedForm));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setError("");

    try {
      await registerUser(form)
      toast.success('Registro exitoso');
      router.push('/login');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      toast.error(error.message || 'Ocurrio un error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Registro</h2>

      <input
        name="firstName"
        type="text"
        placeholder="Nombre"
        value={form.firstName}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

      <input
        name="lastName"
        type="text"
        placeholder="Apellido"
        value={form.lastName}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

      <input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <div className="relative">
        <input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      
      <div className="relative">
        <input
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Repetir contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-1/2 text-gray-500 -translate-y-1/2 hover:text-gray-700"
        >
          {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || Object.keys(errors).length > 0}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}
