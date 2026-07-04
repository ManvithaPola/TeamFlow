// ============================================
// 📄 src/contexts/UserContext.tsx
// ============================================

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import UserService from "../services/user.service";

import type {
  User,
  UserFilters,
} from "../types/user.types";

interface UserContextType {

  users: User[];

  total: number;

  page: number;

  totalPages: number;

  loading: boolean;

  filters: UserFilters;

  setFilters: React.Dispatch<
    React.SetStateAction<UserFilters>
  >;

  refresh: () => Promise<void>;

}

export const UserContext =
  createContext<
    UserContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export const UserProvider = ({
  children,
}: Props) => {

  const [users, setUsers] =
    useState<User[]>([]);

  const [total, setTotal] =
    useState(0);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [filters, setFilters] =
    useState<UserFilters>({
      page: 1,
      limit: 10,
      search: "",
      role: "",
    });

  const refresh =
    useCallback(async () => {

      try {

        setLoading(true);

        const data =
          await UserService.getUsers(
            filters,
          );

        setUsers(
          data.users,
        );

        setTotal(
          data.total,
        );

        setPage(
          data.page,
        );

        setTotalPages(
          data.totalPages,
        );

      } finally {

        setLoading(false);

      }

    }, [filters]);

  useEffect(() => {

    refresh();

  }, [refresh]);

  return (

    <UserContext.Provider
      value={{
        users,
        total,
        page,
        totalPages,
        loading,
        filters,
        setFilters,
        refresh,
      }}
    >

      {children}

    </UserContext.Provider>

  );

};