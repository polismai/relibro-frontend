export type ProductImageType = {
  id: string;
  url: string;
};

export type ProductUserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type ProductType = {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  images: ProductImageType[];
  user: ProductUserType;
};
