import {
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  Comment,
} from "../../types/comment.types";

interface Props {
  comment: Comment;

  onEdit: (comment: Comment) => void;

  onDelete: (id: string) => void;
}

const CommentCard = ({
  comment,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[#F3F0FF]
              text-sm
              font-semibold
              text-[#5B21B6]
            "
          >
            {comment.user.name.charAt(0)}
          </div>

          <div>

            <h3 className="font-semibold">
              {comment.user.name}
            </h3>

            <p className="text-xs text-slate-500">
              {new Date(
                comment.createdAt,
              ).toLocaleString()}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() =>
              onEdit(comment)
            }
            className="
              rounded-lg
              border
              border-slate-200
              p-2
              hover:bg-slate-50
            "
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() =>
              onDelete(comment.id)
            }
            className="
              rounded-lg
              border
              border-red-200
              p-2
              text-red-600
              hover:bg-red-50
            "
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

      <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-700">
        {comment.content}
      </p>

    </div>
  );
};

export default CommentCard;