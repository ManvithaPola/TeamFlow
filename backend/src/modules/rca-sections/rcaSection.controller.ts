import { Response } from "express";

import RCASectionService from "./rcaSection.service";

import { AuthRequest } from "../../middleware/auth.middleware";

class RCASectionController {
  // ==========================================
  // CREATE SECTION
  // ==========================================

  async create(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const section =
        await RCASectionService.createSection(
          req.user!.id,
          req.body,
        );

      return res.status(201).json({
        success: true,
        message:
          "Section created successfully",
        data: section,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // GET SECTIONS
  // ==========================================

  async getByRCA(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const sections =
        await RCASectionService.getSections(
          req.params.rcaId,
        );

      return res.json({
        success: true,
        data: sections,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // UPDATE SECTION
  // ==========================================

  async update(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const section =
        await RCASectionService.updateSection(
          req.params.id,
          req.user!.id,
          req.body,
        );

      return res.json({
        success: true,
        message:
          "Section updated successfully",
        data: section,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // DELETE SECTION
  // ==========================================

  async delete(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      await RCASectionService.deleteSection(
        req.params.id,
        req.user!.id,
      );

      return res.json({
        success: true,
        message:
          "Section deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // REORDER
  // ==========================================

  async reorder(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      await RCASectionService.reorderSections(
        req.user!.id,
        req.body,
      );

      return res.json({
        success: true,
        message:
          "Sections reordered successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new RCASectionController();