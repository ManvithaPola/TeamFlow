import prisma from "../../lib/prisma";
import { TaskStatus, NotificationType } from "@prisma/client";
import DependencyService from "./dependency.service";
import { CreateTaskInput, UpdateTaskInput } from "./task.types";

class TaskService {
  // ==================================================
  // CREATE TASK
  // ==================================================

  async createTask(reporterId: string, data: CreateTaskInput) {
    return prisma.$transaction(async (tx) => {
      // Check project
      const project = await tx.project.findUnique({
        where: {
          id: data.projectId,
        },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      // Validate assignee
      if (data.assigneeId) {
        const member = await tx.projectMember.findUnique({
          where: {
            projectId_userId: {
              projectId: data.projectId,
              userId: data.assigneeId,
            },
          },
        });

        if (!member) {
          throw new Error("Assignee is not a member of this project");
        }
      }

      // Create task
      const task = await tx.task.create({
        data: {
          title: data.title,
          description: data.description,
          priority: data.priority,

          status: TaskStatus.TODO,

          dueDate: data.dueDate ? new Date(data.dueDate) : null,

          estimatedHours: data.estimatedHours,

          projectId: data.projectId,

          assigneeId: data.assigneeId,

          reporterId,
        },

        include: {
          reporter: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
            },
          },

          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
            },
          },

          project: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      // Notify assignee
      if (data.assigneeId) {
        await tx.notification.create({
          data: {
            userId: data.assigneeId,

            title: "Task Assigned",

            message: `You have been assigned "${task.title}"`,

            type: NotificationType.TASK_ASSIGNED,
          },
        });
      }

      // Activity Log

      await tx.activityLog.create({
        data: {
          action: "CREATE",
          entity: "TASK",
          entityId: task.id,
          description: `Created task "${task.title}"`,
          userId: reporterId,
        },
      });

      return task;
    });
  }

  // ==================================================
  // GET ALL TASKS
  // ==================================================

  async getTasks() {
    return prisma.task.findMany({
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },

        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },

        project: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },

        _count: {
          select: {
            comments: true,
            attachments: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==================================================
  // GET TASK
  // ==================================================

  async getTaskById(id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },

      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },

        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },

        project: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },

        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },

        attachments: {
          orderBy: {
            uploadedAt: "desc",
          },
        },

        outgoingRelations: {
          include: {
            targetTask: {
              select: {
                id: true,
                title: true,
                status: true,
              },
            },
          },
        },

        incomingRelations: {
          include: {
            sourceTask: {
              select: {
                id: true,
                title: true,
                status: true,
              },
            },
          },
        },

        _count: {
          select: {
            comments: true,
            attachments: true,
          },
        },
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  // ==================================================
  // UPDATE TASK
  // ==================================================

  async updateTask(id: string, userId: string, data: UpdateTaskInput) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    // ==========================================
    // Dependency Validation
    // ==========================================

    if (data.status === "DONE") {
      await DependencyService.validateTaskCompletion(id);
    }

    const updatedTask = await prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
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

          ...(data.priority && {
            priority: data.priority,
          }),

          ...(data.status && {
            status: data.status,
          }),

          ...(data.assigneeId && {
            assigneeId: data.assigneeId,
          }),

          ...(data.dueDate && {
            dueDate: new Date(data.dueDate),
          }),

          ...(data.estimatedHours !== undefined && {
            estimatedHours: data.estimatedHours,
          }),
        },

        include: {
          reporter: true,

          assignee: true,

          project: true,
        },
      });

      // Notify assignee when task is completed

      if (data.status === "DONE" && task.assigneeId) {
        await tx.notification.create({
          data: {
            userId: task.assigneeId,

            title: "Task Completed",

            message: `"${task.title}" has been marked as completed.`,

            type: "TASK_COMPLETED",
          },
        });
      }

      // Activity Log

      await tx.activityLog.create({
        data: {
          action:
            data.status === "DONE"
              ? "COMPLETE"
              : data.assigneeId
                ? "ASSIGN"
                : "UPDATE",

          entity: "TASK",

          entityId: task.id,

          description:
            data.status === "DONE"
              ? `Completed task "${task.title}"`
              : data.assigneeId
                ? `Assigned task "${task.title}"`
                : `Updated task "${task.title}"`,

          userId,
        },
      });

      return task;
    });

    return updatedTask;
  }

  // ==================================================
  // DELETE TASK
  // ==================================================

  async deleteTask(id: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.$transaction(async (tx) => {
      await tx.activityLog.create({
        data: {
          action: "DELETE",
          entity: "TASK",
          entityId: id,
          description: `Deleted task "${task.title}"`,
          userId,
        },
      });

      await tx.task.delete({
        where: {
          id,
        },
      });

      return true;
    });
  }

  // ==========================================
  // GET TASKS BY PROJECT
  // ==========================================

  async getTasksByProject(projectId: string) {
    return prisma.task.findMany({
      where: {
        projectId,
      },

      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },

        assignee: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },

        project: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },

        _count: {
          select: {
            comments: true,
            attachments: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
  // ==========================================
  // GET TASKS BY ASSIGNEE
  // ==========================================

  async getTasksByAssignee(userId: string) {
    return prisma.task.findMany({
      where: {
        assigneeId: userId,
      },

      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },

        assignee: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },

        project: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },

        _count: {
          select: {
            comments: true,
            attachments: true,
          },
        },
      },

      orderBy: {
        dueDate: "asc",
      },
    });
  }

  // ==========================================
  // CHANGE STATUS
  // ==========================================

  async changeStatus(id: string, status: TaskStatus, userId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (status === TaskStatus.DONE) {
      await DependencyService.validateTaskCompletion(id);
    }

    return prisma.task.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }

  // ==========================================
  // ASSIGN TASK
  // ==========================================

  async assignTask(id: string, assigneeId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: task.projectId,
          userId: assigneeId,
        },
      },
    });

    if (!member) {
      throw new Error("User is not a project member");
    }

    return prisma.task.update({
      where: {
        id,
      },

      data: {
        assigneeId,
      },
    });
  }
}

export default new TaskService();
