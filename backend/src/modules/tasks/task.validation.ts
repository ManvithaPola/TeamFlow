import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters"),

  description: z
    .string()
    .optional(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

  dueDate: z
    .string()
    .optional(),

  estimatedHours: z.coerce.number().optional(),

  projectId: z.string(),

  assigneeId: z
    .string()
    .optional(),
});

export const updateTaskSchema =
  createTaskSchema.partial();