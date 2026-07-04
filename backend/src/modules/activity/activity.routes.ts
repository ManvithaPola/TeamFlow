import { Router } from "express";
import ActivityController from "./activity.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
const router = Router();

// All Activity

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  ActivityController.getAll
);

// Recent Activity

router.get(
  "/recent",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  ActivityController.getRecent
);

// User Activity

router.get(
  "/user/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  ActivityController.getUser
);

// Entity Activity

router.get(
  "/entity/:entity",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  ActivityController.getEntity
);

export default router;