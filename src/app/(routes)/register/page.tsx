'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { registerUser } from '@/api/register'

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("esto estoy enviando", form)
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

      <input
        name="lastName"
        type="text"
        placeholder="Apellido"
        value={form.lastName}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}
