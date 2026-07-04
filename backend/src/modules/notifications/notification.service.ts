import prisma from "../../lib/prisma";

class NotificationService {

  // ==========================================
  // GET MY NOTIFICATIONS
  // ==========================================

  async getMyNotifications(userId: string) {

    return prisma.notification.findMany({

      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }

  // ==========================================
  // MARK AS READ
  // ==========================================

  async markAsRead(id: string) {

    const notification =
      await prisma.notification.findUnique({

        where: {
          id,
        },

      });

    if (!notification) {
      throw new Error("Notification not found");
    }

    return prisma.notification.update({

      where: {
        id,
      },

      data: {
        isRead: true,
      },

    });

  }

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  async markAllAsRead(userId: string) {

    return prisma.notification.updateMany({

      where: {
        userId,
      },

      data: {
        isRead: true,
      },

    });

  }

  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  async deleteNotification(id: string) {

    const notification =
      await prisma.notification.findUnique({

        where: {
          id,
        },

      });

    if (!notification) {
      throw new Error("Notification not found");
    }

    return prisma.notification.delete({

      where: {
        id,
      },

    });

  }

}

export default new NotificationService();