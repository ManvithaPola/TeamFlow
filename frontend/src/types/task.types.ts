// ============================================
// 📄 src/types/task.types.ts
// ============================================

import type { UserRole } from "./auth.types";

// ============================================
// ENUMS
// ============================================

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "BLOCKED";

export type Priority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type RelationType =
  | "BLOCKS"
  | "DEPENDS_ON"
  | "RELATED";

// ============================================
// USER
// ============================================

export interface TaskUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: UserRole;
}

// ============================================
// PROJECT
// ============================================

export interface TaskProject {
  id: string;
  title: string;
  status?: string;
}

// ============================================
// COMMENT
// ============================================

export interface TaskComment {
  id: string;

  content: string;

  createdAt: string;

  updatedAt: string;

  user: TaskUser;
}

// ============================================
// ATTACHMENT
// ============================================

export interface TaskAttachment {
  id: string;

  fileName: string;

  fileUrl: string;

  fileType?: string;

  createdAt: string;
}

// ============================================
// RELATIONS
// ============================================

export interface TaskRelation {
  id: string;

  relationType: RelationType;

  sourceTask?: {
    id: string;
    title: string;
    status: TaskStatus;
  };

  targetTask?: {
    id: string;
    title: string;
    status: TaskStatus;
  };
}

// ============================================
// TASK
// ============================================

export interface Task {
  id: string;

  title: string;

  description?: string | null;

  status: TaskStatus;

  priority: Priority;

  dueDate?: string | null;

  estimatedHours?: number | null;

  createdAt: string;

  updatedAt: string;

  projectId: string;

  assigneeId?: string | null;

  reporterId: string;

  project: TaskProject;

  reporter: TaskUser;

  assignee?: TaskUser | null;

  comments: TaskComment[];

  attachments: TaskAttachment[];

  outgoingRelations: TaskRelation[];

  incomingRelations: TaskRelation[];

  _count: {
    comments: number;
    attachments: number;
  };
}

// ============================================
// CREATE TASK
// ============================================

export interface CreateTaskRequest {
  title: string;

  description?: string;

  priority: Priority;

  dueDate?: string;

  estimatedHours?: number;

  projectId: string;

  assigneeId?: string;
}

// ============================================
// UPDATE TASK
// ============================================

export interface UpdateTaskRequest {
  title?: string;

  description?: string;

  priority?: Priority;

  status?: TaskStatus;

  dueDate?: string;

  estimatedHours?: number;

  assigneeId?: string;
}

// ============================================
// CHANGE STATUS
// ============================================

export interface ChangeTaskStatusRequest {
  status: TaskStatus;
}

// ============================================
// ASSIGN TASK
// ============================================

export interface AssignTaskRequest {
  assigneeId: string;
}

// ============================================
// RESPONSE TYPES
// ============================================

export interface TasksResponse {
  tasks: Task[];
}

export interface TaskResponse {
  task: Task;
}