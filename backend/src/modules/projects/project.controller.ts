import { Response } from "express";
import ProjectService from "./project.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class ProjectController {
  //------------------------------------------
  // CREATE PROJECT
  //------------------------------------------

  async create(req: AuthRequest, res: Response) {
    try {
      const project = await ProjectService.createProject(
        req.user!.id,
        req.body,
      );

      return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  //------------------------------------------
  // GET ALL PROJECTS
  //------------------------------------------

  async getAll(req: AuthRequest, res: Response) {
    try {
      const projects = await ProjectService.getProjects();

      return res.json({
        success: true,
        data: projects,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //------------------------------------------
  // GET PROJECT
  //------------------------------------------

  async getOne(req: AuthRequest, res: Response) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);

      return res.json({
        success: true,
        data: project,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  //------------------------------------------
  // UPDATE PROJECT
  //------------------------------------------

  async update(req: AuthRequest, res: Response) {
    try {
      console.log("BODY:", req.body);

      const project = await ProjectService.updateProject(
        req.params.id,
        req.body,
      );

      return res.json({
        success: true,
        message: "Project updated successfully",
        data: project,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  //------------------------------------------
  // DELETE PROJECT
  //------------------------------------------

  async delete(req: AuthRequest, res: Response) {
    try {
      await ProjectService.deleteProject(req.params.id);

      return res.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  //------------------------------------------
  // ADD MEMBER
  //------------------------------------------

  async addMember(req: AuthRequest, res: Response) {
    try {
      const member = await ProjectService.addMember(
        req.params.id,
        req.body.userId,
        req.body.role,
      );

      return res.status(201).json({
        success: true,
        message: "Member added successfully",
        data: member,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  //------------------------------------------
  // REMOVE MEMBER
  //------------------------------------------

  async removeMember(req: AuthRequest, res: Response) {
    try {
      await ProjectService.removeMember(req.params.id, req.params.userId);

      return res.json({
        success: true,
        message: "Member removed successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async unreadCount(req: AuthRequest, res: Response) {
    try {
      const count = await NotificationService.getUnreadCount(req.user!.id);

      res.json({
        success: true,
        data: {
          count,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMembers(req: AuthRequest, res: Response) {
    try {
      const members = await ProjectService.getMembers(req.params.id);

      res.json({
        success: true,
        data: members,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ProjectController();
