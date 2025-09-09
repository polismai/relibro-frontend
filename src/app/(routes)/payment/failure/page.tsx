import Link from "next/link";

export default function FailurePage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Pago rechazado</h1>
      <p className="mb-6">Hubo un problema al procesar tu pago. Intentá nuevamente.</p>
      <Link href="/" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
        Volver al inicio
      </Link>
    </div>
  );
}
