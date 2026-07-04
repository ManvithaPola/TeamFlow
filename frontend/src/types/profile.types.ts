// ============================================
// 📄 src/types/profile.types.ts
// ============================================

export interface Profile {
  id: string;

  name: string;

  email: string;

  role: string;

  avatar: string | null;

  theme: string;

  createdAt: string;
}

export interface ProfileResponse {
  success: boolean;

  data: Profile;
}

export interface UpdateProfileDTO {
  name: string;

  email: string;

  theme: string;
}