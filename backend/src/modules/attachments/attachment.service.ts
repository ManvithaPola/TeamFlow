import prisma from "../../lib/prisma";
import { CreateAttachmentInput } from "./attachment.types";

class AttachmentService {

  // ==========================================
  // CREATE
  // ==========================================

  async upload(data: CreateAttachmentInput) {

    if (data.taskId) {

      const task = await prisma.task.findUnique({
        where: {
          id: data.taskId,
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

    }

    if (data.rcaId) {

      const rca = await prisma.rCA.findUnique({
        where: {
          id: data.rcaId,
        },
      });

      if (!rca) {
        throw new Error("RCA not found");
      }

    }

    return prisma.attachment.create({

      data: {

        fileName: data.fileName,

        fileUrl: data.fileUrl,

        fileType: data.fileType,

        fileSize: data.fileSize,

        taskId: data.taskId,

        rcaId: data.rcaId,

      },

    });

  }

  // ==========================================
  // TASK ATTACHMENTS
  // ==========================================

  async getTaskAttachments(taskId: string) {

    return prisma.attachment.findMany({

      where: {

        taskId,

      },

      orderBy: {

        uploadedAt: "desc",

      },

    });

  }

  // ==========================================
  // RCA ATTACHMENTS
  // ==========================================

  async getRcaAttachments(rcaId: string) {

    return prisma.attachment.findMany({

      where: {

        rcaId,

      },

      orderBy: {

        uploadedAt: "desc",

      },

    });

  }

  // ==========================================
  // DELETE
  // ==========================================

  async deleteAttachment(id: string) {

    const attachment =
      await prisma.attachment.findUnique({

        where: {

          id,

        },

      });

    if (!attachment) {

      throw new Error("Attachment not found");

    }

    return prisma.attachment.delete({

      where: {

        id,

      },

    });

  }

}

export default new AttachmentService();