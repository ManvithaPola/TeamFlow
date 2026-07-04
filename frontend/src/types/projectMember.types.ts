// ============================================
// 📄 src/types/projectMember.types.ts
// ============================================

export type ProjectRole =
  | "ADMIN"
  | "MANAGER"
  | "DEVELOPER"
  | "REVIEWER";

export interface MemberUser {

  id: string;

  name: string;

  email: string;

  avatar?: string | null;

  role: ProjectRole;

}

export interface ProjectMember {

  id: string;

  projectId: string;

  role: ProjectRole;

  joinedAt: string;

  user: MemberUser;

}

export interface AvailableUser {

  id: string;

  name: string;

  email: string;

  avatar?: string | null;

  role: ProjectRole;

}

export interface AddMemberDTO {

  userId: string;

  role: ProjectRole;

}

export interface UpdateMemberRoleDTO {

  role: ProjectRole;

}