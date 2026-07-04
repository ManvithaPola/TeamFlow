// ============================================
// 📄 member.controller.ts
// ============================================

import { Request, Response } from "express";

import MemberService from "./member.service";

class MemberController {
  // ==========================================
  // GET MEMBERS
  // ==========================================

  async getMembers(req: Request, res: Response) {
    try {
      const members = await MemberService.getMembers(req.params.projectId);

      return res.json({
        success: true,

        data: members,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // AVAILABLE USERS
  // ==========================================

  async getAvailableUsers(req: Request, res: Response) {
    try {
      const users = await MemberService.getAvailableUsers(req.params.projectId);

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
  // ADD MEMBER
  // ==========================================

  async addMember(req: Request, res: Response) {
    try {
      const member = await MemberService.addMember(
        req.params.projectId,

        req.body,
      );

      return res.status(201).json({
        success: true,

        message: "Member added successfully.",

        data: member,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // UPDATE ROLE
  // ==========================================

  async updateMemberRole(req: Request, res: Response) {
    try {
      const member = await MemberService.updateMemberRole(
        req.params.memberId,

        req.body,
      );

      return res.json({
        success: true,

        message: "Member role updated.",

        data: member,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // REMOVE MEMBER
  // ==========================================

  async removeMember(req: Request, res: Response) {
    try {
      await MemberService.removeMember(req.params.memberId);

      return res.json({
        success: true,

        message: "Member removed successfully.",
      });
    } catch (error: any) {
      console.error("DELETE MEMBER ERROR:");
      console.error(error);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new MemberController();
