import { Router } from "express";
import ProjectController from "./project.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { isProjectAdmin } from "../../middleware/project.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

// ===========================================
// PROJECT CRUD
// ===========================================

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  ProjectController.create
);

router.get(
  "/",
  authenticate,
  ProjectController.getAll
);

router.get(
  "/:id",
  authenticate,
  ProjectController.getOne
);

router.put(
  "/:id",
  authenticate,
  isProjectAdmin,
  ProjectController.update
);

router.delete(
  "/:id",
  authenticate,
  isProjectAdmin,
  ProjectController.delete
);

// ===========================================
// PROJECT MEMBERS
// ===========================================

// Get Members ✅ (NEW)
router.get(
  "/:id/members",
  authenticate,
  ProjectController.getMembers
);

// Add Member
router.post(
  "/:id/members",
  authenticate,
  isProjectAdmin,
  ProjectController.addMember
);

// Remove Member
router.delete(
  "/:id/members/:userId",
  authenticate,
  isProjectAdmin,
  ProjectController.removeMember
);

export default router;