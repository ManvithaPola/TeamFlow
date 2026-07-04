import prisma from "../../lib/prisma";
import { CreateCommentInput, UpdateCommentInput } from "./comment.types";
import { NotificationType } from "@prisma/client";

class CommentService {
  // ==========================================
  // CREATE COMMENT
  // ==========================================

  async createComment(
    taskId: string,
    userId: string,
    data: CreateCommentInput,
  ) {
    return prisma.$transaction(async (tx) => {
      const task = await tx.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      const comment = await tx.comment.create({
        data: {
          content: data.content,
          taskId,
          userId,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
            },
          },
        },
      });

      // Notify assignee if someone else commented
      if (task.assigneeId && task.assigneeId !== userId) {
        await tx.notification.create({
          data: {
            userId: task.assigneeId,
            title: "New Comment",
            message: `A new comment was added to "${task.title}".`,
            type: NotificationType.COMMENT,
          },
        });
      }

      // Activity Log
      await tx.activityLog.create({
        data: {
          userId,
          action: "CREATE",
          entity: "COMMENT",
          entityId: comment.id,
          description: `Comment added to task "${task.title}"`,
        },
      });

      return comment;
    });
  }

  // ==========================================
  // GET COMMENTS
  // ==========================================

  async getComments(taskId: string) {
    return prisma.comment.findMany({
      where: {
        taskId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: "asc",
      },
    });
  }

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  async updateComment(id: string, data: UpdateCommentInput) {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    return prisma.comment.update({
      where: {
        id,
      },

      data: {
        content: data.content,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
      },
    });
  }

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  async deleteComment(id: string) {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    return prisma.comment.delete({
      where: {
        id,
      },
    });
  }
  // ==========================================
  // GET RCA COMMENTS
  // ==========================================

  async getRCAComments(rcaId: string) {
    return prisma.comment.findMany({
      where: {
        rcaId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: "asc",
      },
    });
  }
  // ==========================================
  // CREATE RCA COMMENT
  // ==========================================

  async createRCAComment(
    rcaId: string,
    userId: string,
    data: CreateCommentInput,
  ) {
    return prisma.$transaction(async (tx) => {
      const rca = await tx.rCA.findUnique({
        where: {
          id: rcaId,
        },
      });

      if (!rca) {
        throw new Error("RCA not found");
      }

      const comment = await tx.comment.create({
        data: {
          content: data.content,

          rcaId,

          userId,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
            },
          },
        },
      });

      await tx.activityLog.create({
        data: {
          userId,

          action: "CREATE",

          entity: "COMMENT",

          entityId: comment.id,

          description: `Comment added to RCA "${rca.title}"`,
        },
      });

      return comment;
    });
  }
}

export default new CommentService();
