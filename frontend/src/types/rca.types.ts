// ============================================
// 📄 src/types/rca.types.ts
// ============================================

import type {
  Project,
  Attachment,
  Comment,
} from "./project.types";

import type {
  User,
} from "./auth.types";

// ============================================
// ENUMS
// ============================================

export type RCAStatus =
  | "DRAFT"
  | "INVESTIGATING"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "CLOSED";

export type Severity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type ReviewStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

// ============================================
// RCA SECTION
// ============================================

export interface RCASection {
  id: string;

  sectionTitle: string;

  content: string;

  order: number;

  rcaId: string;
}

// ============================================
// RCA REVIEW
// ============================================

export interface RCAReview {
  id: string;

  reviewerId: string;

  reviewer: User;

  rcaId: string;

  status: ReviewStatus;

  comment?: string;

  reviewedAt?: string;
}

// ============================================
// RCA
// ============================================

export interface RCA {
  id: string;

  title: string;

  incident: string;

  severity: Severity;

  status: RCAStatus;

  createdAt: string;

  updatedAt: string;

  projectId: string;

  project: Project;

  createdById: string;

  createdBy: User;

  sections: RCASection[];

  reviews: RCAReview[];

  comments: Comment[];

  attachments: Attachment[];

  _count: {
    comments: number;

    attachments: number;

    reviews: number;

    sections: number;
  };
}

// ============================================
// CREATE RCA
// ============================================

export interface CreateRCARequest {
  title: string;

  incident: string;

  severity: Severity;

  projectId: string;
}

// ============================================
// UPDATE RCA
// ============================================

export interface UpdateRCARequest {
  title?: string;

  incident?: string;

  severity?: Severity;

  status?: RCAStatus;
}

// ============================================
// REVIEW RCA
// ============================================

export interface ReviewRCARequest {
  status: "APPROVED" | "REJECTED";

  comment?: string;
}