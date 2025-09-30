import { getSellerContact } from "@/api/getSellerContact";

export default async function ContactPage({ params }: { params: { bookSlug: string } }) {
  const seller  = await getSellerContact(params.bookSlug);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Contactar al vendedor</h1>
      <p><strong>Nombre/s:</strong> {seller.firstName}</p>
      <p><strong>Apellido/s:</strong> {seller.lastName}</p>
      <p><strong>Teléfono:</strong> {seller.contactPhone}</p>
      <p><strong>Departamento:</strong> {seller.department}</p>
    </div>
  );
}
