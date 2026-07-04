// ============================================
// 📄 src/hooks/useTasks.ts
// ============================================

import { useContext } from "react";

import { TaskContext } from "../contexts/TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider",
    );
  }

  return context;
};