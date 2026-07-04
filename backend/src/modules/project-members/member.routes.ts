// ============================================
// 📄 member.routes.ts
// ============================================

import { Router } from "express";

import MemberController from "./member.controller";

import {
  authenticate,
} from "../../middleware/auth.middleware";

import {
  authorize,
} from "../../middleware/authorize.middleware";

import { Role } from "@prisma/client";

const router = Router();

// ==========================================
// GET MEMBERS
// ==========================================

router.get(
  "/projects/:projectId/members",
  authenticate,
  MemberController.getMembers,
);

// ==========================================
// AVAILABLE USERS
// ==========================================

router.get(
  "/projects/:projectId/available-users",
  authenticate,
  MemberController.getAvailableUsers,
);

// ==========================================
// ADD MEMBER
// ==========================================

router.post(
  "/projects/:projectId/members",
  authenticate,
  authorize(
    Role.ADMIN,
    Role.MANAGER,
  ),
  MemberController.addMember,
);

// ==========================================
// UPDATE ROLE
// ==========================================

router.patch(
  "/projects/:projectId/members/:memberId",
  authenticate,
  authorize(
    Role.ADMIN,
    Role.MANAGER,
  ),
  MemberController.updateMemberRole,
);

// ==========================================
// REMOVE MEMBER
// ==========================================

router.delete(
  "/projects/:projectId/members/:memberId",
  authenticate,
  authorize(
    Role.ADMIN,
    Role.MANAGER,
  ),
  MemberController.removeMember,
);

export default router;