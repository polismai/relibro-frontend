import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded text-center">
      <h1 className="text-2xl font-bold mb-4 text-green-600">¡Pago aprobado!</h1>
      <p className="mb-6">Tu pago se procesó correctamente. Ahora podés publicar tu libro.</p>
      <Link href="/" className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">
        Volver al inicio
      </Link>
    </div>
  );
}