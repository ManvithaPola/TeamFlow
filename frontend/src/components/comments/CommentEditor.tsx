import { useEffect, useState } from "react";

import type {
  Comment,
  UpdateCommentRequest,
} from "../../types/comment.types";

interface Props {
  comment: Comment;

  loading: boolean;

  onClose: () => void;

  onSubmit: (
    data: UpdateCommentRequest,
  ) => Promise<void>;
}

const CommentEditor = ({
  comment,
  loading,
  onClose,
  onSubmit,
}: Props) => {
  const [content, setContent] =
    useState("");

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await onSubmit({
      content,
    });

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          bg-white
          p-8
          shadow-xl
        "
      >
        <h2 className="text-2xl font-semibold">
          Edit Comment
        </h2>

        <textarea
          rows={8}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="
            mt-6
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            focus:border-[#5B21B6]
          "
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              px-5
              py-3
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              rounded-xl
              bg-[#5B21B6]
              px-5
              py-3
              text-white
            "
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default CommentEditor;