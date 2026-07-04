import prisma from "../../lib/prisma";

import {
  CreateSectionInput,
  UpdateSectionInput,
  ReorderInput,
} from "./rcaSection.types";

class RCASectionService {
  // ==========================================
  // CREATE SECTION
  // ==========================================

  async createSection(userId: string, data: CreateSectionInput) {
    return prisma.$transaction(async (tx) => {
      const count = await tx.rCASection.count({
        where: {
          rcaId: data.rcaId,
        },
      });
      const rca = await tx.rCA.findUnique({
        where: {
          id: data.rcaId,
        },
      });

      if (!rca) {
        throw new Error("RCA not found");
      }

      const section = await tx.rCASection.create({
        data: {
          rcaId: data.rcaId,

          sectionTitle: data.sectionTitle,

          content: data.content,

          order: count + 1,
        },
      });

      await tx.activityLog.create({
        data: {
          action: "CREATE",

          entity: "RCA_SECTION",

          entityId: section.id,

          description: `Created section "${section.sectionTitle}"`,

          userId,
        },
      });

      return section;
    });
  }

  // ==========================================
  // GET SECTIONS
  // ==========================================

  async getSections(rcaId: string) {
    return prisma.rCASection.findMany({
      where: {
        rcaId,
      },

      orderBy: {
        order: "asc",
      },
    });
  }

  // ==========================================
  // UPDATE SECTION
  // ==========================================

  async updateSection(id: string, userId: string, data: UpdateSectionInput) {
    const section = await prisma.rCASection.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new Error("Section not found");
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.rCASection.update({
        where: {
          id,
        },

        data: {
          ...(data.sectionTitle && {
            sectionTitle: data.sectionTitle,
          }),

          ...(data.content && {
            content: data.content,
          }),

          ...(data.order && {
            order: data.order,
          }),
        },
      });

      await tx.activityLog.create({
        data: {
          action: "UPDATE",

          entity: "RCA_SECTION",

          entityId: updated.id,

          description: `Updated section "${updated.sectionTitle}"`,

          userId,
        },
      });

      return updated;
    });
  }

  // ==========================================
  // DELETE SECTION
  // ==========================================

  async deleteSection(id: string, userId: string) {
    const section = await prisma.rCASection.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new Error("Section not found");
    }

    await prisma.activityLog.create({
      data: {
        action: "DELETE",

        entity: "RCA_SECTION",

        entityId: id,

        description: `Deleted section "${section.sectionTitle}"`,

        userId,
      },
    });

    return prisma.rCASection.delete({
      where: {
        id,
      },
    });
  }

  // ==========================================
  // REORDER
  // ==========================================

  async reorderSections(userId: string, data: ReorderInput) {
    return prisma.$transaction(async (tx) => {
      for (const section of data.sections) {
        await tx.rCASection.update({
          where: {
            id: section.id,
          },

          data: {
            order: section.order,
          },
        });
      }

      await tx.activityLog.create({
        data: {
          action: "REORDER",

          entity: "RCA_SECTION",

          entityId: "MULTIPLE",

          description: "Reordered RCA sections",

          userId,
        },
      });

      return true;
    });
  }
}

export default new RCASectionService();
