// ============================================
// 📄 src/services/projectMember.service.ts
// ============================================

import api from "../api/axios";

import type {

  ProjectMember,

  AvailableUser,

  AddMemberDTO,

  UpdateMemberRoleDTO,

} from "../types/projectMember.types";
class ProjectMemberService {

  // ==========================================
  // MEMBERS
  // ==========================================

  async getMembers(
    projectId: string,
  ) {

    const response =
      await api.get<{

        success: boolean;

        data: ProjectMember[];

      }>(
        `/projects/${projectId}/members`,
      );

    return response.data.data;

  }

  // ==========================================
  // AVAILABLE USERS
  // ==========================================

  async getAvailableUsers(
    projectId: string,
  ) {

    const response =
      await api.get<{

        success: boolean;

        data: AvailableUser[];

      }>(
        `/projects/${projectId}/available-users`,
      );

    return response.data.data;

  }

  // ==========================================
  // ADD MEMBER
  // ==========================================

  async addMember(
    projectId: string,
    data: AddMemberDTO,
  ) {

    const response =
      await api.post(

        `/projects/${projectId}/members`,

        data,

      );

    return response.data.data;

  }

  // ==========================================
  // UPDATE ROLE
  // ==========================================

  async updateMemberRole(
    projectId: string,
    memberId: string,
    data: UpdateMemberRoleDTO,
  ) {

    const response =
      await api.patch(

        `/projects/${projectId}/members/${memberId}`,

        data,

      );

    return response.data.data;

  }

  // ==========================================
  // REMOVE MEMBER
  // ==========================================

  async removeMember(
    projectId: string,
    memberId: string,
  ) {

    await api.delete(

      `/projects/${projectId}/members/${memberId}`,

    );

  }

}

export default new ProjectMemberService();