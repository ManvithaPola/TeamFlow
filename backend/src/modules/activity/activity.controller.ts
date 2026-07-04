import { Request, Response } from "express";
import ActivityService from "./activity.service";

class ActivityController {

  async getAll(req: Request, res: Response) {

    try {

      const data =
        await ActivityService.getAll();

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  async getRecent(req: Request, res: Response) {

    try {

      const data =
        await ActivityService.getRecent();

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  async getUser(req: Request, res: Response) {

    try {

      const data =
        await ActivityService.getUserActivity(
          req.params.id
        );

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  async getEntity(req: Request, res: Response) {

    try {

      const data =
        await ActivityService.getEntityActivity(
          req.params.entity
        );

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

}

export default new ActivityController();