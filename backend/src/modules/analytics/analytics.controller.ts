import { Response } from "express";

import AnalyticsService from "./analytics.service";

import { AuthRequest } from "../../middleware/auth.middleware";

class AnalyticsController {

  // ==========================================
  // GET ANALYTICS
  // ==========================================

  async getAnalytics(
    req: AuthRequest,
    res: Response,
  ) {

    try {

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      const analytics =
        await AnalyticsService.getAnalytics(

          req.user.id,

          req.user.role,

        );

      return res.json({

        success: true,

        data: analytics,

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

export default new AnalyticsController();