'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { registerUser } from '@/api/register'
import { validation } from './validation'

export type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Errors>({});

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setErrors(validation(updatedForm));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await registerUser(form)
      toast.success('Registro exitoso')
      router.push('/login') // redirige a login después del registro
    } catch (err: any) {
      toast.error(err.message || 'Ocurrio un error')
    } finally {
      setLoading(false)
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
      {errors.firstName && <p>{errors.firstName}</p>}

      <input
        name="lastName"
        type="text"
        placeholder="Apellido"
        value={form.lastName}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      {errors.lastName && <p>{errors.lastName}</p>}

      <input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      {errors.password && <p>{errors.password}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}
