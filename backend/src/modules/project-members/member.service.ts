// ============================================
// 📄 member.service.ts
// ============================================

import prisma from "../../lib/prisma";

import { Role } from "@prisma/client";

import {
  AddMemberDTO,
  UpdateMemberRoleDTO,
} from "./member.types";

class MemberService {

  // ==========================================
  // GET PROJECT MEMBERS
  // ==========================================

  async getMembers(projectId: string) {

    return prisma.projectMember.findMany({

      where: {
        projectId,
      },

      include: {

        user: {

          select: {

            id: true,

            name: true,

            email: true,

            role: true,

            avatar: true,

          },

        },

      },

      orderBy: {

        joinedAt: "asc",

      },

    });

  }

  // ==========================================
  // AVAILABLE USERS
  // ==========================================

  async getAvailableUsers(projectId: string) {

    const members =
      await prisma.projectMember.findMany({

        where: {
          projectId,
        },

        select: {

          userId: true,

        },

      });

    const memberIds =
      members.map(
        (member) => member.userId,
      );

    return prisma.user.findMany({

      where: {

        id: {

          notIn: memberIds,

        },

      },

      select: {

        id: true,

        name: true,

        email: true,

        role: true,

        avatar: true,

      },

      orderBy: {

        name: "asc",

      },

    });

  }

  // ==========================================
  // ADD MEMBER
  // ==========================================

  async addMember(
    projectId: string,
    data: AddMemberDTO,
  ) {

    const exists =
      await prisma.projectMember.findFirst({

        where: {

          projectId,

          userId: data.userId,

        },

      });

    if (exists) {

      throw new Error(
        "User is already a member.",
      );

    }

    return prisma.projectMember.create({

      data: {

        projectId,

        userId: data.userId,

        role: data.role,

      },

      include: {

        user: true,

      },

    });

  }

  // ==========================================
  // UPDATE MEMBER ROLE
  // ==========================================

  async updateMemberRole(
    memberId: string,
    data: UpdateMemberRoleDTO,
  ) {

    return prisma.projectMember.update({

      where: {

        id: memberId,

      },

      data: {

        role: data.role,

      },

      include: {

        user: true,

      },

    });

  }

  // ==========================================
  // REMOVE MEMBER
  // ==========================================

  async removeMember(
    memberId: string,
  ) {

    return prisma.projectMember.delete({

      where: {

        id: memberId,

      },

    });

  }

}

export default new MemberService();