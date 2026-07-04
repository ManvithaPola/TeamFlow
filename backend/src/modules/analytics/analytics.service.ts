import prisma from "../../lib/prisma";

import {
  ProjectStatus,
  RCAStatus,
  Role,
  TaskPriority,
  TaskStatus,
} from "@prisma/client";

class AnalyticsService {
  // ==========================================================
  // MAIN ANALYTICS
  // ==========================================================

  async getAnalytics(userId: string, role: Role) {
    const [
      overview,

      taskStatus,

      taskPriority,

      projectStatus,

      rcaStatus,

      productivity,
    ] = await Promise.all([
      this.getOverview(userId, role),

      this.getTaskStatus(userId, role),

      this.getTaskPriority(userId, role),

      this.getProjectStatus(userId, role),

      this.getRCAStatus(userId, role),

      this.getProductivity(userId, role),
    ]);

    return {
      overview,

      taskStatus,

      taskPriority,

      projectStatus,

      rcaStatus,

      productivity,
    };
  }

  // ==========================================================
  // OVERVIEW
  // ==========================================================

  private async getOverview(userId: string, role: Role) {
    const isAdmin = role === Role.ADMIN || role === Role.MANAGER;

    console.log("Role:", role);
    console.log("Is Admin:", isAdmin);

    const taskWhere = isAdmin
      ? {}
      : {
          assigneeId: userId,
        };

    const projectWhere = isAdmin
      ? {}
      : {
          members: {
            some: {
              userId,
            },
          },
        };

    const rcaWhere = isAdmin
      ? {}
      : {
          createdById: userId,
        };

    const [
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalRCAs,
      openRCAs,
    ] = await Promise.all([
      prisma.project.count({
        where: projectWhere,
      }),

      prisma.project.count({
        where: {
          ...projectWhere,
          status: ProjectStatus.ACTIVE,
        },
      }),

      prisma.project.count({
        where: {
          ...projectWhere,
          status: ProjectStatus.COMPLETED,
        },
      }),

      prisma.task.count({
        where: taskWhere,
      }),

      prisma.task.count({
        where: {
          ...taskWhere,
          status: TaskStatus.DONE,
        },
      }),

      prisma.task.count({
        where: {
          ...taskWhere,
          status: {
            not: TaskStatus.DONE,
          },
        },
      }),

      prisma.task.count({
        where: {
          ...taskWhere,
          dueDate: {
            lt: new Date(),
          },
          status: {
            not: TaskStatus.DONE,
          },
        },
      }),

      prisma.rCA.count({
        where: rcaWhere,
      }),

      prisma.rCA.count({
        where: {
          ...rcaWhere,
          status: {
            in: [
              RCAStatus.DRAFT,
              RCAStatus.INVESTIGATING,
              RCAStatus.SUBMITTED,
              RCAStatus.UNDER_REVIEW,
            ],
          },
        },
      }),
    ]);

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalRCAs,
      openRCAs,
    };
  }

  // ==========================================================
  // TASK STATUS
  // ==========================================================

  private async getTaskStatus(
  userId: string,
  role: Role,
) {

  const isAdmin =
    role === Role.ADMIN ||
    role === Role.MANAGER;

  const where = isAdmin
    ? {}
    : {
        assigneeId: userId,
      };

  const summary = await prisma.task.groupBy({
    by: ["status"],
    where,
    _count: {
      status: true,
    },
  });

  return summary.map((item) => ({
    status: item.status,
    count: item._count.status,
  }));
}

  // ==========================================================
  // TASK PRIORITY
  // ==========================================================

  private async getTaskPriority(
  userId: string,
  role: Role,
) {

  const isAdmin =
    role === Role.ADMIN ||
    role === Role.MANAGER;

  const where = isAdmin
    ? {}
    : {
        assigneeId: userId,
      };

  const summary = await prisma.task.groupBy({
    by: ["priority"],
    where,
    _count: {
      priority: true,
    },
  });

  return summary.map((item) => ({
    priority: item.priority,
    count: item._count.priority,
  }));
}

  // ==========================================================
  // PROJECT STATUS
  // ==========================================================

  private async getProjectStatus(userId: string, role: Role) {
    const isAdmin = role === Role.ADMIN || role === Role.MANAGER;

    const where = isAdmin
      ? {}
      : {
          members: {
            some: {
              userId,
            },
          },
        };

    const summary = await prisma.project.groupBy({
      by: ["status"],
      where,
      _count: {
        status: true,
      },
    });

    return summary.map((item) => ({
      status: item.status,
      count: item._count.status,
    }));
  }

  // ==========================================================
  // RCA STATUS
  // ==========================================================

  private async getRCAStatus(
  userId: string,
  role: Role,
) {

  const isAdmin =
    role === Role.ADMIN ||
    role === Role.MANAGER;

  const where = isAdmin
    ? {}
    : {
        createdById: userId,
      };

  const summary = await prisma.rCA.groupBy({
    by: ["status"],
    where,
    _count: {
      status: true,
    },
  });

  return summary.map((item) => ({
    status: item.status,
    count: item._count.status,
  }));
}

  // ==========================================================
  // TEAM PRODUCTIVITY
  // ==========================================================

  private async getProductivity(userId: string, role: Role) {
    if (role === Role.DEVELOPER) {
      return [];
    }

    const developers = await prisma.user.findMany({
      where: {
        role: Role.DEVELOPER,
      },

      include: {
        assignedTasks: true,
      },
    });

    return developers.map((dev) => {
      const completed = dev.assignedTasks.filter(
        (task) => task.status === TaskStatus.DONE,
      ).length;

      return {
        developer: dev.name,

        assigned: dev.assignedTasks.length,

        completed,
      };
    });
  }
}

export default new AnalyticsService();
