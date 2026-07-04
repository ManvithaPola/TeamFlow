import { createContext, useCallback, useState, type ReactNode } from "react";

import CommentService from "../services/comment.service";

import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/comment.types";

// ============================================
// CONTEXT TYPE
// ============================================

interface CommentContextType {
  comments: Comment[];

  loading: boolean;

  error: string | null;

  getComments: (taskId: string) => Promise<void>;

  getRCAComments: (rcaId: string) => Promise<void>;

  createComment: (taskId: string, data: CreateCommentRequest) => Promise<void>;

  createRCAComment: (
    rcaId: string,
    data: CreateCommentRequest,
  ) => Promise<void>;

  updateComment: (id: string, data: UpdateCommentRequest) => Promise<void>;

  deleteComment: (id: string) => Promise<void>;
}

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined,
);

// ============================================
// PROVIDER
// ============================================

interface Props {
  children: ReactNode;
}

export const CommentProvider = ({ children }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [currentTaskId, setCurrentTaskId] = useState("");
  const [currentRCAId, setCurrentRCAId] = useState("");

  // ==========================================
  // GET COMMENTS
  // ==========================================

  const getComments = useCallback(async (taskId: string) => {
    try {
      setLoading(true);

      setError(null);

      setCurrentTaskId(taskId);

      const data = await CommentService.getComments(taskId);

      setComments(data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // GET RCA COMMENTS
  // ==========================================

  const getRCAComments = useCallback(async (rcaId: string) => {
    try {
      setLoading(true);

      setError(null);

      setCurrentRCAId(rcaId);

      const data = await CommentService.getRCAComments(rcaId);

      setComments(data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // CREATE COMMENT
  // ==========================================

  const createComment = async (taskId: string, data: CreateCommentRequest) => {
    try {
      setLoading(true);

      setError(null);

      await CommentService.createComment(taskId, data);

      await getComments(taskId);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create comment");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CREATE RCA COMMENT
  // ==========================================

  const createRCAComment = async (
    rcaId: string,
    data: CreateCommentRequest,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await CommentService.createRCAComment(rcaId, data);

      await getRCAComments(rcaId);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create comment");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  const updateComment = async (id: string, data: UpdateCommentRequest) => {
    try {
      setLoading(true);

      setError(null);

      await CommentService.updateComment(id, data);

      if (currentTaskId) {
        await getComments(currentTaskId);
      }

      if (currentRCAId) {
        await getRCAComments(currentRCAId);
      }
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to update comment");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  const deleteComment = async (id: string) => {
    try {
      setLoading(true);

      setError(null);

      await CommentService.deleteComment(id);

      if (currentTaskId) {
        await getComments(currentTaskId);
      }

      if (currentRCAId) {
        await getRCAComments(currentRCAId);
      }
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to delete comment");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,

        getComments,
        getRCAComments,

        createComment,
        createRCAComment,

        updateComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
