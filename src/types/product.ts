import { School } from "./school";
import { SchoolYear } from "./schoolYear";

export type BookImageType = {
  id: string;
  url: string;
};

export type BookUserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  department: string;
  role: string;
};

export type BookType = {
  id: string;
  title: string;
  author?: string;
  school?: School;
  subject?: string;
  schoolYear?: SchoolYear;
  genre?: string;
  description?: string;
  conditionNote?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  images: BookImageType[];
  user: BookUserType;
};
