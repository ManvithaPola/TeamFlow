import { Request, Response } from "express";
import DependencyService from "./dependency.service";

class DependencyController {
  // ==========================================
  // ADD DEPENDENCY
  // ==========================================

  async add(req: Request, res: Response) {
    try {
      const dependency =
        await DependencyService.addDependency(
          req.params.id,
          req.body.targetTaskId,
          req.body.relationType
        );

      return res.status(201).json({
        success: true,
        message: "Dependency created successfully",
        data: dependency,
      });

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // REMOVE DEPENDENCY
  // ==========================================

  async remove(req: Request, res: Response) {
    try {

      await DependencyService.removeDependency(
        req.params.relationId
      );

      return res.json({
        success: true,
        message: "Dependency removed successfully",
      });

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // GET DEPENDENCIES
  // ==========================================

  async get(req: Request, res: Response) {
    try {

      const dependencies =
        await DependencyService.getDependencies(
          req.params.id
        );

      return res.json({
        success: true,
        data: dependencies,
      });

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new DependencyController();