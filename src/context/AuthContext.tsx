import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import type { AuthUser } from '../types';

type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const storageKey = 'latta-kapada-auth';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login(name, email) {
        const nextUser = { name, email };
        setUser(nextUser);
        localStorage.setItem(storageKey, JSON.stringify(nextUser));
      },
      logout() {
        setUser(null);
        localStorage.removeItem(storageKey);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
