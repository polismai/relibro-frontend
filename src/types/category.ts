export type CategoryType = {
  label: string;
  value: string;
  imageUrl: string;
};

export const CATEGORY_LABELS: Record<string, string> = {
  school: 'Libros escolares',
  story: 'Libros de literatura',
};