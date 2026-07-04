import prisma from "../../lib/prisma";
import { Role } from "@prisma/client";
import { CreateProjectInput, UpdateProjectInput } from "./project.types";

class ProjectService {
  // ==================================================
  // CREATE PROJECT
  // ==================================================

  async createProject(userId: string, data: CreateProjectInput) {
    return prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          title: data.title,
          description: data.description,
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
          createdById: userId,
        },
      });

      await tx.projectMember.create({
        data: {
          projectId: project.id,
          userId,
          role: Role.ADMIN,
        },
      });

      return project;
    });
  }

  // ==================================================
  // GET ALL PROJECTS
  // ==================================================

  // ==================================================
  // GET ALL PROJECTS
  // ==================================================

  async getProjects() {
    return prisma.project.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            theme: true,
          },
        },

        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
              },
            },
          },
        },

        _count: {
          select: {
            tasks: true,
            members: true,
            rcas: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==================================================
  // GET PROJECT BY ID
  // ==================================================

   async getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },

    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          role: true,
          theme: true,
        },
      },

      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
            },
          },
        },
      },

      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },

      rcas: {
        orderBy: {
          createdAt: "desc",
        },
      },

      _count: {
        select: {
          tasks: true,
          members: true,
          rcas: true,
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
}

  // ==================================================
  // GET PROJECT BY ID
  // ==================================================

  // ==================================================
  // GET PROJECT BY ID
  // ==================================================

  // ==================================================
  // UPDATE PROJECT
  // ==================================================

  async updateProject(id: string, data: UpdateProjectInput) {
    const exists = await prisma.project.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new Error("Project not found");
    }
    console.log("Updating:", data);
    return prisma.project.update({
      where: {
        id,
      },

      data: {
        ...(data.title && {
          title: data.title,
        }),

        ...(data.description !== undefined && {
          description: data.description,
        }),

        ...(data.status && {
          status: data.status,
        }),

        ...(data.startDate && {
          startDate: new Date(data.startDate),
        }),

        ...(data.endDate && {
          endDate: new Date(data.endDate),
        }),
      },
    });
  }

  // ==================================================
  // DELETE PROJECT
  // ==================================================

  async deleteProject(id: string) {
    const exists = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!exists) {
      throw new Error("Project not found");
    }

    return prisma.project.delete({
      where: {
        id,
      },
    });
  }

  // ==================================================
  // ADD MEMBER
  // ==================================================

  async addMember(projectId: string, userId: string, role: Role) {
    return prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      const user = await tx.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const exists = await tx.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId,
          },
        },
      });

      if (exists) {
        throw new Error("User is already a member of this project");
      }

      const member = await tx.projectMember.create({
        data: {
          projectId,
          userId,
          role,
        },
      });

      await tx.notification.create({
        data: {
          userId,
          title: "Project Invitation",
          message: `You have been added to project "${project.title}"`,
          type: "PROJECT_INVITATION",
        },
      });

      return member;
    });
  }

  // ==================================================
  // REMOVE MEMBER
  // ==================================================

  async removeMember(projectId: string, userId: string) {
    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });

    if (!member) {
      throw new Error("Member not found");
    }

    return prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });
  }

  // ==================================================
  // GET PROJECT MEMBERS
  // ==================================================

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
            avatar: true,
            role: true,
          },
        },
      },

      orderBy: {
        joinedAt: "asc",
      },
    });
  }

  // ==========================================
  // UNREAD COUNT
  // ==========================================

  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}

export default new ProjectService();
