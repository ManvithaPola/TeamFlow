import { z } from "zod";

export const createAttachmentSchema = z.object({

  fileName: z.string().min(1),

  fileUrl: z.string().url(),

  fileType: z.string().min(1),

  fileSize: z.number().positive(),

  taskId: z.string().optional(),

  rcaId: z.string().optional(),

}).refine(
  data => data.taskId || data.rcaId,
  {
    message: "Either taskId or rcaId is required.",
  }
);