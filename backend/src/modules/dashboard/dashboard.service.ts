import prisma from "../../lib/prisma";

import { ProjectStatus, RCAStatus, Role, TaskStatus } from "@prisma/client";

class DashboardService {
  // ==========================================================
  // MAIN DASHBOARD
  // ==========================================================

  async getOverview(userId: string, role: Role) {
    const [stats, taskStatus, projectProgress, recentActivity, notifications] =
      await Promise.all([
        this.getStats(userId, role),

        this.getTaskStatus(userId, role),

        this.getProjectProgress(userId, role),

        this.getRecentActivity(userId,role),

        this.getNotifications(userId),
      ]);

    return {
      stats,

      taskStatus,

      projectProgress,

      recentActivity,

      notifications,
    };
  }

  // ==========================================================
  // STATS
  // ==========================================================

  private async getStats(userId: string, role: Role) {
    // ----------------------------
    // ADMIN / MANAGER
    // ----------------------------

    if (role === Role.ADMIN || role === Role.MANAGER) {
      const [projects, tasks, pendingRCA, notifications] = await Promise.all([
        prisma.project.count(),

        prisma.task.count(),

        prisma.rCA.count({
          where: {
            status: {
              in: [RCAStatus.SUBMITTED, RCAStatus.UNDER_REVIEW],
            },
          },
        }),

        prisma.notification.count({
          where: {
            userId,

            isRead: false,
          },
        }),
      ]);

      return {
        projects,

        tasks,

        pendingRCA,

        notifications,
      };
    }

    // ----------------------------
    // DEVELOPER
    // ----------------------------

    if (role === Role.DEVELOPER) {
      const [projects, tasks, pendingRCA, notifications] = await Promise.all([
        prisma.projectMember.count({
          where: {
            userId,
          },
        }),

        prisma.task.count({
          where: {
            assigneeId: userId,
          },
        }),

        prisma.rCA.count({
          where: {
            createdById: userId,

            status: {
              in: [RCAStatus.SUBMITTED, RCAStatus.UNDER_REVIEW],
            },
          },
        }),

        prisma.notification.count({
          where: {
            userId,

            isRead: false,
          },
        }),
      ]);

      return {
        projects,

        tasks,

        pendingRCA,

        notifications,
      };
    }

    // ----------------------------
    // REVIEWER
    // ----------------------------

    const [projects, tasks, pendingRCA, notifications] = await Promise.all([
      prisma.projectMember.count({
        where: {
          userId,
        },
      }),

      prisma.task.count({
        where: {
          assigneeId: userId,
        },
      }),

      prisma.rCAReview.count({
        where: {
          reviewerId: userId,

          status: "PENDING",
        },
      }),

      prisma.notification.count({
        where: {
          userId,

          isRead: false,
        },
      }),
    ]);

    return {
      projects,

      tasks,

      pendingRCA,

      notifications,
    };
  }
  // ==========================================================
  // TASK STATUS
  // ==========================================================

  private async getTaskStatus(userId: string, role: Role) {
    const where =
      role === Role.ADMIN || role === Role.MANAGER
        ? {}
        : {
            assigneeId: userId,
          };

    const [todo, inProgress, inReview, done] = await Promise.all([
      prisma.task.count({
        where: {
          ...where,
          status: TaskStatus.TODO,
        },
      }),

      prisma.task.count({
        where: {
          ...where,
          status: TaskStatus.IN_PROGRESS,
        },
      }),

      prisma.task.count({
        where: {
          ...where,
          status: TaskStatus.IN_REVIEW,
        },
      }),

      prisma.task.count({
        where: {
          ...where,
          status: TaskStatus.DONE,
        },
      }),
    ]);

    return [
      {
        status: "TODO",
        count: todo,
      },

      {
        status: "IN_PROGRESS",
        count: inProgress,
      },

      {
        status: "IN_REVIEW",
        count: inReview,
      },

      {
        status: "DONE",
        count: done,
      },
    ];
  }

  // ==========================================================
  // PROJECT PROGRESS
  // ==========================================================

  private async getProjectProgress(userId: string, role: Role) {
    const where =
      role === Role.ADMIN || role === Role.MANAGER
        ? {}
        : {
            members: {
              some: {
                userId,
              },
            },
          };

    const [planning, active, completed] = await Promise.all([
      prisma.project.count({
        where: {
          ...where,
          status: ProjectStatus.PLANNING,
        },
      }),

      prisma.project.count({
        where: {
          ...where,
          status: ProjectStatus.ACTIVE,
        },
      }),

      prisma.project.count({
        where: {
          ...where,
          status: ProjectStatus.COMPLETED,
        },
      }),
    ]);

    return [
      {
        name: "Planning",
        value: planning,
      },

      {
        name: "Active",
        value: active,
      },

      {
        name: "Completed",
        value: completed,
      },
    ];
  }

  // ==========================================================
  // RECENT ACTIVITY
  // ==========================================================

  private async getRecentActivity(
  userId: string,
  role: Role,
) {

  const where =
    role === Role.ADMIN || role === Role.MANAGER
      ? {}
      : {
          userId,
        };

  return prisma.activityLog.findMany({

    where,

    take: 10,

    orderBy: {
      createdAt: "desc",
    },

    include: {

      user: {

        select: {

          id: true,

          name: true,

          email: true,

          role: true,

        },

      },

    },

  });

}

  // ==========================================================
  // RECENT NOTIFICATIONS
  // ==========================================================

  private async getNotifications(userId: string) {
    return prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 6,
    });
  }
}
export default new DashboardService();
