// ============================================
// 📄 src/modules/users/user.controller.ts
// ============================================

import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import UserService from "./user.service";
class UserController {
  // ==========================================
  // GET ALL USERS
  // ==========================================

  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers({
        page: Number(req.query.page),

        limit: Number(req.query.limit),

        search: req.query.search as string,

        role: req.query.role as any,
      });

      return res.json({
        success: true,

        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // GET USER
  // ==========================================

  async getById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);

      return res.json({
        success: true,

        data: user,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // CREATE USER
  // ==========================================

  async create(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);

      return res.status(201).json({
        success: true,

        message: "User created successfully",

        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // UPDATE USER
  // ==========================================

  async update(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(
        req.params.id,

        req.body,
      );

      return res.json({
        success: true,

        message: "User updated successfully",

        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // CHANGE ROLE
  // ==========================================

  async changeRole(req: Request, res: Response) {
    try {
      const user = await UserService.changeRole(
        req.params.id,

        req.body.role,
      );

      return res.json({
        success: true,

        message: "Role updated successfully",

        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // DELETE USER
  // ==========================================

  async delete(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);

      return res.json({
        success: true,

        message: "User deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }
  // ==========================================
// GET MY PROFILE
// ==========================================

async me(req: AuthRequest, res: Response) {
  try {
    const user = await UserService.getProfile(
      req.user!.id,
    );

    return res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ==========================================
// UPDATE MY PROFILE
// ==========================================

async updateMe(
  req: AuthRequest,
  res: Response,
) {
  try {
    const user = await UserService.updateProfile(
      req.user!.id,
      req.body,
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
}

export default new UserController();
