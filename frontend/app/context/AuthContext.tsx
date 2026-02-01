"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUserFromToken, logout as apiLogout } from "../lib/auth";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  refreshUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const refreshUser = () => {
    const u = getUserFromToken();
    setUser(u);
  };

  // 🔥 Re-check auth on route change
  useEffect(() => {
    refreshUser();
  }, [pathname]);

  const logout = () => {
    apiLogout();
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
