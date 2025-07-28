import { SchoolYear } from '@/types/schoolYear';
import { useEffect, useState } from 'react';

export const useGetSchoolYears = () => {
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/school-year`)
      .then((res) => res.json())
      .then((data) => setSchoolYears(data))
      .catch(() => setSchoolYears([]))
      .finally(() => setLoading(false));
  }, []);

  return { schoolYears, loading };
};