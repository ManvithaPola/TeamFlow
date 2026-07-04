// ============================================
// 📄 src/modules/users/user.types.ts
// ============================================

import { Role } from "@prisma/client";

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

export interface ChangeRoleDTO {
  role: Role;
}

// ============================================
// USER QUERY
// ============================================


export interface UserQuery {

  page?: number;

  limit?: number;

  search?: string;

  role?: Role;

}

export interface PaginatedUsers {

  users: any[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;

}