import { z } from "zod";

export const createRCASchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150),

  incident: z
    .string()
    .min(5, "Incident description is required"),

  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

  projectId: z
    .string()
    .min(1, "Project ID is required"),
});

export const updateRCASchema = z.object({
  title: z.string().optional(),

  incident: z.string().optional(),

  severity: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ])
    .optional(),

  status: z
    .enum([
      "DRAFT",
      "INVESTIGATING",
      "SUBMITTED",
      "UNDER_REVIEW",
      "APPROVED",
      "CLOSED",
    ])
    .optional(),
});

export const reviewRCASchema = z.object({

  status: z.enum([
    "APPROVED",
    "REJECTED",
  ]),

  comment: z
    .string()
    .min(3)
    .max(500)
    .optional(),

});