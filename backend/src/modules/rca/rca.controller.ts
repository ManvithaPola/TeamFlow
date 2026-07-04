import { Response } from "express";
import RCAService from "./rca.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class RCAController {
  // ==========================================
  // CREATE RCA
  // ==========================================

  async create(req: AuthRequest, res: Response) {
    try {
      const rca = await RCAService.createRCA(req.user!.id, req.body);

      return res.status(201).json({
        success: true,
        message: "RCA created successfully",
        data: rca,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // GET ALL RCAs
  // ==========================================

  async getAll(req: AuthRequest, res: Response) {
    try {
      const rcas = await RCAService.getRCAs();

      return res.json({
        success: true,
        data: rcas,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // GET SINGLE RCA
  // ==========================================

  async getOne(req: AuthRequest, res: Response) {
    try {
      const rca = await RCAService.getRCAById(req.params.id);

      return res.json({
        success: true,
        data: rca,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // UPDATE RCA
  // ==========================================

  async update(req: AuthRequest, res: Response) {
    try {
      const rca = await RCAService.updateRCA(req.params.id, req.body);

      return res.json({
        success: true,
        message: "RCA updated successfully",
        data: rca,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // SUBMIT RCA
  // ==========================================

  async submit(req: AuthRequest, res: Response) {
    try {
      const rca = await RCAService.submitRCA(req.params.id, req.user!.id);

      return res.json({
        success: true,
        message: "RCA submitted successfully",
        data: rca,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // REVIEW RCA
  // ==========================================

  async review(req: AuthRequest, res: Response) {
    try {
      const review = await RCAService.reviewRCA(
        req.params.id,

        req.user!.id,

        req.body.status,

        req.body.comment,
      );

      return res.json({
        success: true,

        message: "Review submitted successfully",

        data: review,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // GET RCA REVIEWS
  // ==========================================

  async getReviews(req: AuthRequest, res: Response) {
    try {
      const reviews = await RCAService.getReviews(req.params.id);

      return res.json({
        success: true,

        data: reviews,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // CLOSE RCA
  // ==========================================

  async close(req: AuthRequest, res: Response) {
    try {
      const rca = await RCAService.closeRCA(req.params.id, req.user!.id);

      return res.json({
        success: true,

        message: "RCA closed successfully",

        data: rca,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // DELETE RCA
  // ==========================================

  async delete(req: AuthRequest, res: Response) {
    try {
      await RCAService.deleteRCA(req.params.id, req.user!.id);

      return res.json({
        success: true,
        message: "RCA deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getByProject(req: AuthRequest, res: Response) {
  try {
    const rcas = await RCAService.getRCAsByProject(
      req.params.projectId,
    );

    return res.json({
      success: true,
      data: rcas,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
}

export default new RCAController();
