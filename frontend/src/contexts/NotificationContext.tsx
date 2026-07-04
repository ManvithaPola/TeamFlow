// ============================================
// 📄 src/contexts/NotificationContext.tsx
// ============================================

import {
  createContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import NotificationService, {
  type Notification,
} from "../services/notification.service";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;

  refresh: () => Promise<void>;

  markAsRead: (id: string) => Promise<void>;

  markAllAsRead: () => Promise<void>;

  deleteNotification: (id: string) => Promise<void>;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH
  // =====================================

  const refresh = useCallback(async () => {
    try {
      const notificationData = await NotificationService.getNotifications();

      setNotifications(notificationData);

      setUnreadCount(
        notificationData.filter((notification) => !notification.isRead).length,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const interval = setInterval(refresh, 30000);

    return () => clearInterval(interval);
  }, [refresh]);

  // =====================================
  // MARK READ
  // =====================================

  const markAsRead = async (id: string) => {
    await NotificationService.markAsRead(id);

    await refresh();
  };

  // =====================================
  // MARK ALL
  // =====================================

  const markAllAsRead = async () => {
    await NotificationService.markAllAsRead();

    await refresh();
  };

  // =====================================
  // DELETE
  // =====================================

  const deleteNotification = async (id: string) => {
    await NotificationService.deleteNotification(id);

    await refresh();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,

        refresh,

        markAsRead,

        markAllAsRead,

        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
