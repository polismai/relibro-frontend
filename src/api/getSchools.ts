import { useEffect, useState } from 'react';

export const useGetSchools = () => {
  const [schools, setSchools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schools`)
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch(() => setSchools([]))
      .finally(() => setLoading(false));
  }, []);

  return { schools, loading };
};