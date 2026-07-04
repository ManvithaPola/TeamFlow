// ============================================
// 📄 src/types/user.types.ts
// ============================================

export type Role =
  | "ADMIN"
  | "MANAGER"
  | "DEVELOPER"
  | "REVIEWER";

export interface UserStats {
  assignedTasks: number;
  createdRCAs: number;
  notifications: number;
}

export interface User {
  id: string;

  name: string;

  email: string;

  role: Role;

  createdAt: string;

  updatedAt?: string;

  _count: UserStats;
}

export interface UserListResponse {
  users: User[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export interface UserResponse {
  success: boolean;

  data: UserListResponse;
}

export interface CreateUserDTO {
  name: string;

  email: string;

  password: string;

  role: Role;
}

export interface UpdateUserDTO {
  name?: string;

  email?: string;

  role?: Role;
}

export interface UserFilters {
  page: number;

  limit: number;

  search: string;

  role: string;
}