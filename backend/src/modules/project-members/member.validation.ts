// ============================================
// 📄 member.validation.ts
// ============================================

import { z } from "zod";

import { Role } from "@prisma/client";

export const addMemberSchema = z.object({

  userId: z.string().uuid(),

  role: z.nativeEnum(Role),

});

export const updateMemberSchema = z.object({

  role: z.nativeEnum(Role),

});