// ============================================
// 📄 src/modules/users/user.routes.ts
// ============================================

import { Router } from "express";

import UserController from "./user.controller";

import {
  authenticate,
} from "../../middleware/auth.middleware";

import {
  authorize,
} from "../../middleware/authorize.middleware";

import { Role } from "@prisma/client";

const router = Router();

// ==========================================
// MY PROFILE
// ==========================================

router.get(
  "/me",
  authenticate,
  UserController.me,
);

router.put(
  "/me",
  authenticate,
  UserController.updateMe,
);

// ==========================================
// GET ALL USERS
// ADMIN & MANAGER
// ==========================================

router.get(
  "/",
  authenticate,
  authorize(
    Role.ADMIN,
    Role.MANAGER,
  ),
  UserController.getAll,
);

// ==========================================
// GET USER BY ID
// ADMIN & MANAGER
// ==========================================

router.get(
  "/:id",
  authenticate,
  authorize(
    Role.ADMIN,
    Role.MANAGER,
  ),
  UserController.getById,
);

// ==========================================
// CREATE USER
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  UserController.create,
);

// ==========================================
// UPDATE USER
// ADMIN ONLY
// ==========================================

router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  UserController.update,
);

// ==========================================
// CHANGE ROLE
// ADMIN ONLY
// ==========================================

router.patch(
  "/:id/role",
  authenticate,
  authorize(Role.ADMIN),
  UserController.changeRole,
);

// ==========================================
// DELETE USER
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  UserController.delete,
);

export default router;