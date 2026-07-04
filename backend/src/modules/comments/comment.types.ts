import { z } from "zod";

import {
  createCommentSchema,
  updateCommentSchema,
} from "./comment.validation";

export type CreateCommentInput = z.infer<
  typeof createCommentSchema
>;

export type UpdateCommentInput = z.infer<
  typeof updateCommentSchema
>;