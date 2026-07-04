export interface Comment {
  id: string;

  content: string;

  createdAt: string;

  taskId?: string;

  userId: string;

  user: {
    id: string;

    name: string;

    email: string;

    avatar?: string;

    role: string;
  };
}

// ============================================
// CREATE
// ============================================

export interface CreateCommentRequest {
  content: string;
}

// ============================================
// UPDATE
// ============================================

export interface UpdateCommentRequest {
  content: string;
}