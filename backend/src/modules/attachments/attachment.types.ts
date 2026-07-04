import { z } from "zod";
import { createAttachmentSchema } from "./attachment.validation";

export type CreateAttachmentInput =
  z.infer<typeof createAttachmentSchema>;