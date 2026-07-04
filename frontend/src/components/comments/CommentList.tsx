import {
  useEffect,
  useState,
} from "react";

import { useComments } from "../../hooks/useComments";

import type {
  Comment,
} from "../../types/comment.types";

import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import CommentEditor from "./CommentEditor";

interface Props {
  taskId?: string;

  rcaId?: string;
}

const CommentList = ({
  taskId,
  rcaId,
}: Props) => {
  const {
    comments,
    loading,
    getComments,
    getRCAComments,
    createComment,
    createRCAComment,
    updateComment,
    deleteComment,
  } = useComments();

  const [editing, setEditing] =
    useState<Comment | null>(null);

  // ==========================================
  // LOAD COMMENTS
  // ==========================================

  useEffect(() => {
    if (taskId) {
      getComments(taskId);
    }

    if (rcaId) {
      getRCAComments(rcaId);
    }
  }, [
    taskId,
    rcaId,
    getComments,
    getRCAComments,
  ]);

  // ==========================================
  // ADD COMMENT
  // ==========================================

  const handleCreateComment = async (
    content: string,
  ) => {
    if (taskId) {
      await createComment(taskId, {
        content,
      });
    }

    if (rcaId) {
      await createRCAComment(rcaId, {
        content,
      });
    }
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <h2 className="mb-8 text-xl font-semibold">
        Comments
      </h2>

      <AddComment
        loading={loading}
        onSubmit={handleCreateComment}
      />

      <div className="mt-8 space-y-5">
        {comments.length === 0 && (
          <p className="text-slate-500">
            No comments yet.
          </p>
        )}

        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onEdit={setEditing}
            onDelete={deleteComment}
          />
        ))}
      </div>

      {editing && (
        <CommentEditor
          comment={editing}
          loading={loading}
          onClose={() =>
            setEditing(null)
          }
          onSubmit={async (
            data,
          ) => {
            await updateComment(
              editing.id,
              data,
            );

            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

export default CommentList;