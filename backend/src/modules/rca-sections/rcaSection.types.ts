import { z } from "zod";

import {
  createSectionSchema,
  updateSectionSchema,
  reorderSchema,
} from "./rcaSection.validation";

export type CreateSectionInput =
  z.infer<typeof createSectionSchema>;

export type UpdateSectionInput =
  z.infer<typeof updateSectionSchema>;

export type ReorderInput =
  z.infer<typeof reorderSchema>;