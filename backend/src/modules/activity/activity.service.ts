import prisma from "../../lib/prisma";

class ActivityService {

  // ==========================================
  // GET ALL ACTIVITY
  // ==========================================

  async getAll() {

    return prisma.activityLog.findMany({

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

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  // ==========================================
  // GET RECENT ACTIVITY
  // ==========================================

  async getRecent() {

    return prisma.activityLog.findMany({

      take: 20,

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

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  // ==========================================
  // GET USER ACTIVITY
  // ==========================================

  async getUserActivity(userId: string) {

    return prisma.activityLog.findMany({

      where: {

        userId,

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

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  // ==========================================
  // GET ENTITY ACTIVITY
  // ==========================================

  async getEntityActivity(entity: string) {

    return prisma.activityLog.findMany({

      where: {

        entity,

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

      orderBy: {

        createdAt: "desc",

      },

    });

  }

}

export default new ActivityService();