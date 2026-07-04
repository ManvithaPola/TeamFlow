// ============================================
// 📄 src/hooks/useNotifications.ts
// ============================================

import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider."
    );
  }

  return context;
};