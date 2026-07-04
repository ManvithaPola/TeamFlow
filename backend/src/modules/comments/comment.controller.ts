import { Response } from "express";
import CommentService from "./comment.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class CommentController {
  // ==========================================
  // CREATE COMMENT
  // ==========================================

  async create(req: AuthRequest, res: Response) {
    try {
      const comment = await CommentService.createComment(
        req.params.id,
        req.user!.id,
        req.body,
      );

      return res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: comment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // GET COMMENTS
  // ==========================================

  async getAll(req: AuthRequest, res: Response) {
    try {
      const comments = await CommentService.getComments(req.params.id);

      return res.json({
        success: true,
        data: comments,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  async update(req: AuthRequest, res: Response) {
    try {
      const comment = await CommentService.updateComment(
        req.params.id,
        req.body,
      );

      return res.json({
        success: true,
        message: "Comment updated successfully",
        data: comment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  async delete(req: AuthRequest, res: Response) {
    try {
      await CommentService.deleteComment(req.params.id);

      return res.json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async createRCA(req: AuthRequest, res: Response) {
    try {
      const comment = await CommentService.createRCAComment(
        req.params.id,
        req.user!.id,
        req.body,
      );

      return res.status(201).json({
        success: true,
        data: comment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getRCA(req: AuthRequest, res: Response) {
    try {
      const comments = await CommentService.getRCAComments(req.params.id);

      return res.json({
        success: true,
        data: comments,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new CommentController();
