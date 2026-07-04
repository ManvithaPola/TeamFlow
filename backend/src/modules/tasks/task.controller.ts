import { Response } from "express";
import TaskService from "./task.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class TaskController {
  // ============================================
  // CREATE TASK
  // ============================================

  async create(req: AuthRequest, res: Response) {
    try {
      const task = await TaskService.createTask(
        req.user!.id,
        req.body,
      );

      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // GET ALL TASKS
  // ============================================

  async getAll(req: AuthRequest, res: Response) {
    try {
      const tasks = await TaskService.getTasks();

      return res.json({
        success: true,
        data: tasks,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // GET TASK
  // ============================================

  async getOne(req: AuthRequest, res: Response) {
    try {
      const task = await TaskService.getTaskById(
        req.params.id,
      );

      return res.json({
        success: true,
        data: task,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // GET TASKS BY PROJECT
  // ============================================

  async getByProject(req: AuthRequest, res: Response) {
    try {
      const tasks = await TaskService.getTasksByProject(
        req.params.projectId,
      );

      return res.json({
        success: true,
        data: tasks,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // GET TASKS BY ASSIGNEE
  // ============================================

  async getByAssignee(req: AuthRequest, res: Response) {
    try {
      const tasks = await TaskService.getTasksByAssignee(
        req.params.userId,
      );

      return res.json({
        success: true,
        data: tasks,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // UPDATE TASK
  // ============================================

  async update(req: AuthRequest, res: Response) {
    try {
      const task = await TaskService.updateTask(
        req.params.id,
        req.user!.id,
        req.body,
      );

      return res.json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // CHANGE TASK STATUS
  // ============================================

  async changeStatus(req: AuthRequest, res: Response) {
    try {
      const task = await TaskService.changeStatus(
        req.params.id,
        req.body.status,
        req.user!.id,
      );

      return res.json({
        success: true,
        message: "Task status updated successfully",
        data: task,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // ASSIGN TASK
  // ============================================

  async assignTask(req: AuthRequest, res: Response) {
    try {
      const task = await TaskService.assignTask(
        req.params.id,
        req.body.assigneeId,
        req.user!.id,
      );

      return res.json({
        success: true,
        message: "Task assigned successfully",
        data: task,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ============================================
  // DELETE TASK
  // ============================================

  async delete(req: AuthRequest, res: Response) {
    try {
      await TaskService.deleteTask(
        req.params.id,
        req.user!.id,
      );

      return res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new TaskController();