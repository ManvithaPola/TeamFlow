// ============================================
// 📄 src/types/dashboard.types.ts
// ============================================

export interface DashboardStats {
  projects: number;
  tasks: number;
  pendingRCA: number;
  notifications: number;
}

export interface ActivityUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "DEVELOPER" | "REVIEWER";
}

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  description: string;
  createdAt: string;
  user: ActivityUser;
}

export interface TaskStatusData {
  status: string;
  count: number;
}

export interface ProjectProgressData {
  name: string;
  value: number;
}

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: ActivityLog[];
  taskStatus: TaskStatusData[];
  projectProgress: ProjectProgressData[];
  notifications: DashboardNotification[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}