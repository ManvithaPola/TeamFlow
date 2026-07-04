import { z } from "zod";

export const createSectionSchema = z.object({
  rcaId: z.string(),

  sectionTitle: z
    .string()
    .min(3)
    .max(100),

  content: z
    .string()
    .min(1),
});

export const updateSectionSchema =
  createSectionSchema
    .omit({
      rcaId: true,
    })
    .partial();

export const reorderSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),

      order: z.number(),
    }),
  ),
});