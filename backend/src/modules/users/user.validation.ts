// ============================================
// 📄 src/modules/users/user.validation.ts
// ============================================

import { z } from "zod";

export const createUserSchema = z.object({

  name: z
    .string()
    .min(3, "Name must contain at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum([
    "ADMIN",
    "MANAGER",
    "DEVELOPER",
    "REVIEWER",
  ]),

});

export const updateUserSchema = z.object({

  name: z
    .string()
    .min(3)
    .optional(),

  email: z
    .string()
    .email()
    .optional(),

  role: z.enum([
    "ADMIN",
    "MANAGER",
    "DEVELOPER",
    "REVIEWER",
  ]).optional(),

});

export const changeRoleSchema = z.object({

  role: z.enum([
    "ADMIN",
    "MANAGER",
    "DEVELOPER",
    "REVIEWER",
  ]),

});