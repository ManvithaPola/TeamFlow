import { Router } from "express";
import NotificationController from "./notification.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Get Notifications

router.get(
  "/",
  authenticate,
  NotificationController.getAll
);

// Mark Read

router.put(
  "/:id/read",
  authenticate,
  NotificationController.markRead
);

// Mark All Read

router.put(
  "/read-all",
  authenticate,
  NotificationController.markAll
);

// Delete Notification

router.delete(
  "/:id",
  authenticate,
  NotificationController.delete
);

export default router;