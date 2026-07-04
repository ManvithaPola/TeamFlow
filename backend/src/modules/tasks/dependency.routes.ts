import { Router } from "express";
import DependencyController from "./dependency.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/:id/dependencies",
  authenticate,
  DependencyController.add
);

router.get(
  "/:id/dependencies",
  authenticate,
  DependencyController.get
);

router.delete(
  "/:id/dependencies/:relationId",
  authenticate,
  DependencyController.remove
);

export default router;