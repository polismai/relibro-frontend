'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { User } from '@/types/user';

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      useCart.getState().removeAll(); 
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      fetch('http://localhost:3001/api/auth/me', {
        credentials: 'include',
      })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    } finally {
      setUser(null);
      useCart.getState().removeAll();
      router.push('/');
    }
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

