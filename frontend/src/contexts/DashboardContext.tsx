// ============================================
// 📄 src/contexts/DashboardContext.tsx
// ============================================

import {
  createContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import DashboardService from "../services/dashboard.service";

import type {
  DashboardOverview,
  TaskSummary,
  RCASummary,
  RecentActivity,
  DashboardNotification,
} from "../types/dashboard.types";

interface DashboardContextType {
  overview: DashboardOverview | null;

  taskSummary: TaskSummary | null;

  rcaSummary: RCASummary | null;

  recentActivity: RecentActivity[];

  recentNotifications: DashboardNotification[];

  loading: boolean;

  refresh: () => Promise<void>;
}

export const DashboardContext =
  createContext<
    DashboardContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export const DashboardProvider = ({
  children,
}: Props) => {
  const [overview, setOverview] =
    useState<DashboardOverview | null>(
      null,
    );

  const [
    taskSummary,
    setTaskSummary,
  ] =
    useState<TaskSummary | null>(
      null,
    );

  const [
    rcaSummary,
    setRCASummary,
  ] =
    useState<RCASummary | null>(
      null,
    );

  const [
    recentActivity,
    setRecentActivity,
  ] = useState<
    RecentActivity[]
  >([]);

  const [
    recentNotifications,
    setRecentNotifications,
  ] = useState<
    DashboardNotification[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const refresh =
    useCallback(async () => {
      try {
        setLoading(true);

        const [
          overview,

          tasks,

          rcas,

          activity,

          notifications,
        ] = await Promise.all([
          DashboardService.getOverview(),

          DashboardService.getTaskSummary(),

          DashboardService.getRCASummary(),

          DashboardService.getRecentActivity(),

          DashboardService.getRecentNotifications(),
        ]);

        setOverview(overview);

        setTaskSummary(tasks);

        setRCASummary(rcas);

        setRecentActivity(
          activity,
        );

        setRecentNotifications(
          notifications,
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <DashboardContext.Provider
      value={{
        overview,

        taskSummary,

        rcaSummary,

        recentActivity,

        recentNotifications,

        loading,

        refresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};