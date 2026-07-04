// ============================================
// 📄 src/services/notification.service.ts
// ============================================

import api from "../api/axios";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

class NotificationService {
  // ======================================
  // GET NOTIFICATIONS
  // ======================================

  async getNotifications(): Promise<Notification[]> {
    const response = await api.get("/notifications");

    return response.data.data;
  }

  // ======================================
  // UNREAD COUNT
  // ======================================

//   async getUnreadCount(): Promise<number> {
//     const response = await api.get(
//       "/notifications/unread-count"
//     );

//     return response.data.data.count;
//   }

  // ======================================
  // MARK AS READ
  // ======================================

  async markAsRead(id: string): Promise<void> {
    await api.put(`/notifications/${id}/read`);
  }

  // ======================================
  // MARK ALL AS READ
  // ======================================

  async markAllAsRead(): Promise<void> {
    await api.put("/notifications/read-all");
  }

  // ======================================
  // DELETE
  // ======================================

  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  }
}

export default new NotificationService();