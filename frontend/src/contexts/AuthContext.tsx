// ============================================
// 📄 src/contexts/AuthContext.tsx
// ============================================

import { createContext, useEffect, useState } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  User,
} from "../types/auth.types";
import AuthService from "../services/auth.service";
import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  clearStorage,
} from "../utils/storage";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // =====================================
  // Hydrate session from localStorage
  // =====================================

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // =====================================
  // LOGIN
  // =====================================

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log("1. Calling API...");

      const response = await AuthService.login({ email, password });

      console.log("2. API Response:", response);

      saveToken(response.token);
      console.log("3. Token Saved");

      saveUser(response.user);
      console.log("4. User Saved");

      setToken(response.token);
      console.log("5. Token State Updated");

      setUser(response.user);
      console.log("6. User State Updated");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      throw error;
    }
  };

  // =====================================
  // LOGOUT
  // =====================================

  const logout = (): void => {
    clearStorage();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
