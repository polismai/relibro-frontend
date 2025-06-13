'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  email: string;
  firstName: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

