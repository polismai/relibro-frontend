import { BookUserType } from "@/types/product";

type SellerInfoProps = {
  seller: BookUserType;
};

const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <div className="mt-3 text-sm text-gray-700 border-t pt-3">
      <p><strong>Vendedor:</strong> {seller.firstName} {seller.lastName}</p>
      <p><strong>Email:</strong> {seller.email}</p>
      <p><strong>Teléfono:</strong> {seller.contactPhone || "-"}</p>
      <p><strong>Departamento:</strong> {seller.department || "-"}</p>
    </div>
  )
}

export default SellerInfo;