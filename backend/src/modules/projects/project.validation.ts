import { z } from "zod";
import { ProjectStatus } from "@prisma/client";
export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Project title must be at least 3 characters")
    .max(100),

  description: z.string().optional(),

  status: z.nativeEnum(ProjectStatus).optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
