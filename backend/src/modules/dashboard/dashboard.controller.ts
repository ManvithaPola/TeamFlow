import { Response } from "express";
import DashboardService from "./dashboard.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class DashboardController {
  async overview(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const data = await DashboardService.getOverview(
        req.user.id,
        req.user.role as any
      );

      return res.json({
        success: true,
        data,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new DashboardController();