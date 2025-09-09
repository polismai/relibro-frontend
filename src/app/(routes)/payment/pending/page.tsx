import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded text-center">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">Pago pendiente</h1>
      <p className="mb-6">Tu pago está pendiente de confirmación. Podés revisar tu estado más tarde.</p>
      <Link href="/" className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700">
        Volver al inicio
      </Link>
    </div>
  );
}
