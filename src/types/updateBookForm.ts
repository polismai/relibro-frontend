import { School } from "./school";
import { SchoolYear } from "./schoolYear";

export type BookFormType = {
  title: string;
  author: string | null;
  genre: string | null;
  school: School | null;
  subject: string | null;
  schoolYear: SchoolYear | null;
  description: string | null;
  conditionNote: string | null;
  price: number;
  category: string | null;
};
