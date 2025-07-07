export type GenreOption = {
  label: string;
  value: string;
};

export const GENRE_LABELS: Record<string, string> = {
  children: 'Infantil',
  young_adult: 'Juvenil',
  novel: 'Novela',
  short_story: 'Cuento',
  manual: 'Manual/Guía',
  dictionary: 'Diccionario',
  educational: 'Didáctico/Pedagógico',
  comic: 'Cómic/Historieta',
  other: 'Otros',
};