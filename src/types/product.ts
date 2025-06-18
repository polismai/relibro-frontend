export type BookImageType = {
  id: string;
  url: string;
};

export type BookUserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type BookType = {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  images: BookImageType[];
  user: BookUserType;
};
