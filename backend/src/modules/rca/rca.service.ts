import prisma from "../../lib/prisma";
import { CreateRCAInput, UpdateRCAInput } from "./rca.types";
import { RCAStatus, NotificationType } from "@prisma/client";

class RCAService {
  // ==========================================
  // CREATE RCA
  // ==========================================

  async createRCA(userId: string, data: CreateRCAInput) {
    return prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: {
          id: data.projectId,
        },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      const rca = await tx.rCA.create({
        data: {
          title: data.title,

          incident: data.incident,

          severity: data.severity,

          status: RCAStatus.DRAFT,

          projectId: data.projectId,

          createdById: userId,
        },

        include: {
          project: {
            select: {
              id: true,
              title: true,
            },
          },

          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      await tx.activityLog.create({
        data: {
          action: "CREATE",

          entity: "RCA",

          entityId: rca.id,

          description: `Created RCA "${rca.title}"`,

          userId,
        },
      });

      return rca;
    });
  }

  // ==========================================
  // GET ALL RCA
  // ==========================================

  async getRCAs() {
    return prisma.rCA.findMany({
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          },
        },

        reviews: true,

        _count: {
          select: {
            comments: true,
            attachments: true,
            sections: true,
            reviews: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==========================================
  // GET RCA
  // ==========================================

  async getRCAById(id: string) {
    const rca = await prisma.rCA.findUnique({
      where: {
        id,
      },

      include: {
        project: true,

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        sections: {
          orderBy: {
            order: "asc",
          },
        },

        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,

                name: true,

                email: true,

                role: true,
              },
            },
          },
        },

        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },

        attachments: {
          orderBy: {
            uploadedAt: "desc",
          },
        },

        _count: {
          select: {
            comments: true,
            attachments: true,
            reviews: true,
            sections: true,
          },
        },
      },
    });

    if (!rca) {
      throw new Error("RCA not found");
    }

    return rca;
  }

  async getRCAsByProject(projectId: string) {
    return prisma.rCA.findMany({
      where: {
        projectId,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },

        reviews: true,

        _count: {
          select: {
            comments: true,
            attachments: true,
            sections: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==========================================
  // UPDATE RCA
  // ==========================================

  async updateRCA(id: string, data: UpdateRCAInput) {
    const rca = await prisma.rCA.findUnique({
      where: {
        id,
      },
    });

    if (!rca) {
      throw new Error("RCA not found");
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.rCA.update({
        where: {
          id,
        },

        data: {
          ...(data.title && {
            title: data.title,
          }),

          ...(data.incident && {
            incident: data.incident,
          }),

          ...(data.severity && {
            severity: data.severity,
          }),

          ...(data.status && {
            status: data.status,
          }),
        },
      });

      // ==========================================
      // Notify Reviewers
      // ==========================================

      if (data.status === RCAStatus.SUBMITTED) {
        const reviewers = await tx.user.findMany({
          where: {
            role: "REVIEWER",
          },
        });

        for (const reviewer of reviewers) {
          await tx.notification.create({
            data: {
              userId: reviewer.id,

              title: "New RCA Submitted",

              message: `${updated.title} requires review.`,

              type: NotificationType.RCA_SUBMITTED,
            },
          });
        }
      }

      // ==========================================
      // Activity Log
      // ==========================================

      await tx.activityLog.create({
        data: {
          action: "UPDATE",
          entity: "RCA",
          entityId: updated.id,
          description: `Updated RCA "${updated.title}"`,
          userId: rca.createdById,
        },
      });

      return updated;
    });
  }

  // ==========================================
  // SUBMIT RCA
  // ==========================================

  async submitRCA(id: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const rca = await tx.rCA.findUnique({
        where: {
          id,
        },
        include: {
          project: true,
        },
      });

      if (!rca) {
        throw new Error("RCA not found");
      }

      if (rca.status !== RCAStatus.DRAFT) {
        throw new Error("Only draft RCAs can be submitted.");
      }

      const updatedRCA = await tx.rCA.update({
        where: {
          id,
        },
        data: {
          status: RCAStatus.SUBMITTED,
        },
      });

      // Notify all reviewers

      const reviewers = await tx.user.findMany({
        where: {
          role: "REVIEWER",
        },
      });

      for (const reviewer of reviewers) {
        await tx.notification.create({
          data: {
            userId: reviewer.id,
            title: "New RCA Submitted",
            message: `"${rca.title}" has been submitted for review.`,
            type: NotificationType.RCA_SUBMITTED,
          },
        });
      }

      // Activity Log

      await tx.activityLog.create({
        data: {
          userId,
          action: "SUBMIT",
          entity: "RCA",
          entityId: rca.id,
          description: `Submitted RCA "${rca.title}"`,
        },
      });

      return updatedRCA;
    });
  }

  // ==========================================
  // REVIEW RCA
  // ==========================================

  async reviewRCA(
    rcaId: string,
    reviewerId: string,
    status: "APPROVED" | "REJECTED",
    comment?: string,
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

      if (
        rca.status !== RCAStatus.SUBMITTED &&
        rca.status !== RCAStatus.UNDER_REVIEW
      ) {
        throw new Error("Only submitted or under review RCAs can be reviewed.");
      }

      const review = await tx.rCAReview.create({
        data: {
          reviewerId,
          rcaId,
          status,
          comment,
          reviewedAt: new Date(),
        },
      });

      await tx.rCA.update({
        where: {
          id: rcaId,
        },
        data: {
          status:
            status === "APPROVED" ? RCAStatus.APPROVED : RCAStatus.UNDER_REVIEW,
        },
      });

      await tx.notification.create({
        data: {
          userId: rca.createdById,
          title: status === "APPROVED" ? "RCA Approved" : "RCA Needs Changes",
          message:
            status === "APPROVED"
              ? `"${rca.title}" has been approved.`
              : `"${rca.title}" was rejected. Please update it.`,
          type:
            status === "APPROVED"
              ? NotificationType.RCA_APPROVED
              : NotificationType.RCA_REJECTED,
        },
      });

      await tx.activityLog.create({
        data: {
          userId: reviewerId,
          action: status,
          entity: "RCA_REVIEW",
          entityId: review.id,
          description: `RCA review completed`,
        },
      });

      return review;
    });
  }

  // ==========================================
  // GET RCA REVIEWS
  // ==========================================

  async getReviews(rcaId: string) {
    return prisma.rCAReview.findMany({
      where: {
        rcaId,
      },

      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },

      orderBy: {
        reviewedAt: "desc",
      },
    });
  }

  // ==========================================
  // CLOSE RCA
  // ==========================================

  async closeRCA(id: string, userId: string) {
    const rca = await prisma.rCA.findUnique({
      where: {
        id,
      },
    });

    if (!rca) {
      throw new Error("RCA not found");
    }

    if (rca.status !== RCAStatus.APPROVED) {
      throw new Error("Only approved RCAs can be closed.");
    }

    return prisma.rCA.update({
      where: {
        id,
      },
      data: {
        status: RCAStatus.CLOSED,
      },
    });
  }
  // ==========================================
  // DELETE RCA
  // ==========================================

  // ==========================================
  // DELETE RCA
  // ==========================================

  async deleteRCA(id: string, userId: string) {
    const rca = await prisma.rCA.findUnique({
      where: {
        id,
      },
    });

    if (!rca) {
      throw new Error("RCA not found");
    }

    await prisma.activityLog.create({
      data: {
        action: "DELETE",
        entity: "RCA",
        entityId: id,
        description: `Deleted RCA "${rca.title}"`,
        userId,
      },
    });

    return prisma.rCA.delete({
      where: {
        id,
      },
    });
  }
}

export default new RCAService();
