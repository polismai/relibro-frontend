import { useEffect, useState } from 'react';

type GenreOption = {
  label: string;
  value: string;
};

export const useGetGenres = () => {
  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, []);

  return { genres, loading };
};