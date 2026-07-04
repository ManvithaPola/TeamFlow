// ============================================
// 📄 src/types/review.types.ts
// ============================================

export type ReviewStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type RCAStatus =
  | "DRAFT"
  | "INVESTIGATING"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "CLOSED";

export interface Reviewer {
  id: string;

  name: string;

  email: string;

  avatar: string | null;
}

export interface Project {
  id: string;

  title: string;
}

export interface RCA {
  id: string;

  title: string;

  incident: string;

  severity: string;

  status: RCAStatus;

  project: Project;
}

export interface Review {
  id: string;

  reviewerId: string;

  rcaId: string;

  status: ReviewStatus;

  comment: string | null;

  reviewedAt: string | null;

  reviewer: Reviewer;

  rca: RCA;
}

export interface ReviewsResponse {
  success: boolean;

  data: Review[];
}

export interface UpdateReviewDTO {
  status: ReviewStatus;

  comment?: string;
}