import { z } from "zod";

import {
  createRCASchema,
  updateRCASchema,
  reviewRCASchema,
} from "./rca.validation";

export type CreateRCAInput = z.infer<
  typeof createRCASchema
>;

export type UpdateRCAInput = z.infer<
  typeof updateRCASchema
>;

export type ReviewRCAInput = z.infer<
  typeof reviewRCASchema
>;