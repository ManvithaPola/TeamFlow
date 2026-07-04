import { TOKEN_KEY, USER_KEY } from "../constants/auth";
import type { User } from "../types/auth.types";
// ==============================
// TOKEN
// ==============================

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// ==============================
// USER
// ==============================

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// ==============================
// CLEAR ALL
// ==============================

export const clearStorage = (): void => {
  removeToken();
  removeUser();
};