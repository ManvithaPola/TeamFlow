// ============================================
// 📄 src/contexts/TaskContext.tsx
// ============================================

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import TaskService from "../services/task.service";

import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskStatus,
} from "../types/task.types";

// ============================================
// CONTEXT TYPE
// ============================================

interface TaskContextType {
  tasks: Task[];

  task: Task | null;

  loading: boolean;

  error: string | null;

  refresh: () => Promise<void>;

  getTask: (id: string) => Promise<void>;

  createTask: (
    data: CreateTaskRequest,
  ) => Promise<void>;

  updateTask: (
    id: string,
    data: UpdateTaskRequest,
  ) => Promise<void>;

  deleteTask: (
    id: string,
  ) => Promise<void>;

  changeStatus: (
    id: string,
    status: TaskStatus,
  ) => Promise<void>;

  assignTask: (
    id: string,
    assigneeId: string,
  ) => Promise<void>;

  getTasksByProject: (
    projectId: string,
  ) => Promise<Task[]>;

  getTasksByAssignee: (
    userId: string,
  ) => Promise<Task[]>;
}

export const TaskContext =
  createContext<TaskContextType | undefined>(
    undefined,
  );

// ============================================
// PROVIDER
// ============================================

interface Props {
  children: ReactNode;
}

export const TaskProvider = ({
  children,
}: Props) => {
  // ========================================
  // STATE
  // ========================================

  const [tasks, setTasks] = useState<Task[]>([]);

  const [task, setTask] =
    useState<Task | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ========================================
  // GET ALL TASKS
  // ========================================

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data =
        await TaskService.getTasks();

      setTasks(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to load tasks",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // GET SINGLE TASK
  // ========================================

  const getTask = useCallback(
    async (id: string) => {
      try {
        setLoading(true);

        setError(null);

        const data =
          await TaskService.getTask(id);

        setTask(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ??
            "Failed to fetch task",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ========================================
  // CREATE
  // ========================================

  const createTask = async (
    data: CreateTaskRequest,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await TaskService.createTask(data);

      await refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to create task",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UPDATE
  // ========================================

  const updateTask = async (
    id: string,
    data: UpdateTaskRequest,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await TaskService.updateTask(
        id,
        data,
      );

      await getTask(id);

      await refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to update task",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DELETE
  // ========================================

  const deleteTask = async (
    id: string,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await TaskService.deleteTask(id);

      if (task?.id === id) {
        setTask(null);
      }

      await refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to delete task",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // CHANGE STATUS
  // ========================================

  const changeStatus = async (
    id: string,
    status: TaskStatus,
  ) => {
    try {
      await TaskService.changeStatus(id, {
        status,
      });

      await getTask(id);

      await refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to update status",
      );

      throw err;
    }
  };

  // ========================================
  // ASSIGN TASK
  // ========================================

  const assignTask = async (
    id: string,
    assigneeId: string,
  ) => {
    try {
      await TaskService.assignTask(id, {
        assigneeId,
      });

      await getTask(id);

      await refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to assign task",
      );

      throw err;
    }
  };

  // ========================================
  // GET TASKS BY PROJECT
  // ========================================

  const getTasksByProject =
    async (
      projectId: string,
    ): Promise<Task[]> => {
      return TaskService.getTasksByProject(
        projectId,
      );
    };

  // ========================================
  // GET TASKS BY ASSIGNEE
  // ========================================

  const getTasksByAssignee =
    async (
      userId: string,
    ): Promise<Task[]> => {
      return TaskService.getTasksByAssignee(
        userId,
      );
    };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        loading,
        error,
        refresh,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        changeStatus,
        assignTask,
        getTasksByProject,
        getTasksByAssignee,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;