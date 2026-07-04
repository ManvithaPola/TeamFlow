import { Response } from "express";
import NotificationService from "./notification.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class NotificationController {

  async getAll(req: AuthRequest, res: Response) {

    try {

      const notifications =
        await NotificationService.getMyNotifications(
          req.user!.id
        );

      res.json({
        success: true,
        data: notifications,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  async markRead(req: AuthRequest, res: Response) {

    try {

      const notification =
        await NotificationService.markAsRead(
          req.params.id
        );

      res.json({
        success: true,
        message: "Notification marked as read",
        data: notification,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }

  }

  async markAll(req: AuthRequest, res: Response) {

    try {

      await NotificationService.markAllAsRead(
        req.user!.id
      );

      res.json({
        success: true,
        message: "All notifications marked as read",
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }

  }

  async delete(req: AuthRequest, res: Response) {

    try {

      await NotificationService.deleteNotification(
        req.params.id
      );

      res.json({
        success: true,
        message: "Notification deleted successfully",
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }

  }

}

export default new NotificationController();