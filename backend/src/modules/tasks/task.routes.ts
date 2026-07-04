import { Router } from "express";
import TaskController from "./task.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
const router = Router();

// ============================================
// TASK CRUD
// ============================================

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  TaskController.create
);

router.get(
  "/",
  authenticate,
  TaskController.getAll
);

router.get(
  "/project/:projectId",
  authenticate,
  TaskController.getByProject,
);

router.get(
  "/assignee/:userId",
  authenticate,
  TaskController.getByAssignee,
);

router.patch(
  "/:id/status",
  authenticate,
  TaskController.changeStatus,
);

router.patch(
  "/:id/assign",
  authenticate,
  TaskController.assignTask,
);

router.get(
  "/:id",
  authenticate,
  TaskController.getOne
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER", "DEVELOPER"),
  TaskController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  TaskController.delete
);

export default router;