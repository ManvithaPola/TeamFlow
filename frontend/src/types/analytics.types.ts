// ============================================
// 📄 src/types/analytics.types.ts
// ============================================

export interface Overview {
  totalProjects: number;

  activeProjects: number;

  completedProjects: number;

  totalTasks: number;

  completedTasks: number;

  pendingTasks: number;

  overdueTasks: number;

  totalRCAs: number;

  openRCAs: number;
}

export interface TaskStatus {
  status: string;

  count: number;
}

export interface TaskPriority {
  priority: string;

  count: number;
}

export interface ProjectStatus {
  status: string;

  count: number;
}

export interface RCAStatus {
  status: string;

  count: number;
}

export interface Productivity {
  developer: string;

  assigned: number;

  completed: number;
}

export interface AnalyticsData {
  overview: Overview;

  taskStatus: TaskStatus[];

  taskPriority: TaskPriority[];

  projectStatus: ProjectStatus[];

  rcaStatus: RCAStatus[];

  productivity: Productivity[];
}

export interface AnalyticsResponse {
  success: boolean;

  data: AnalyticsData;
}