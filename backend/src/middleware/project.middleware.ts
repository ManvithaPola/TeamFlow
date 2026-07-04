import { Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "./auth.middleware";

export const isProjectAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const projectId = req.params.id;

  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: req.user!.id,
      },
    },
  });

  if (!member) {
    return res.status(403).json({
      success: false,
      message: "You are not a member of this project",
    });
  }

  if (member.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Only project admins can perform this action",
    });
  }

  next();
};
