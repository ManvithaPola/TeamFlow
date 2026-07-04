// ============================================
// 📄 member.types.ts
// ============================================

import { Role } from "@prisma/client";

export interface AddMemberDTO {

  userId: string;

  role: Role;

}

export interface UpdateMemberRoleDTO {

  role: Role;

}

export interface MemberQuery {

  search?: string;

}