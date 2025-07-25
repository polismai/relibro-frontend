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
  school?: string;
  subject?: string;
  schoolYear?: string;
  genre?: string;
  description?: string;
  conditionNote?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  images: BookImageType[];
  user: BookUserType;
};
