import { useState } from "react";

interface Props {
  loading: boolean;

  onSubmit: (
    content: string,
  ) => Promise<void>;
}

const AddComment = ({
  loading,
  onSubmit,
}: Props) => {
  const [content, setContent] =
    useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await onSubmit(content);

    setContent("");
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
      "
    >
      <textarea
        rows={4}
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value,
          )
        }
        placeholder="Write a comment..."
        className="
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

      <div className="mt-4 flex justify-end">

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            rounded-xl
            bg-[#5B21B6]
            px-5
            py-3
            text-white
            disabled:opacity-50
          "
        >
          {loading
            ? "Posting..."
            : "Add Comment"}
        </button>

      </div>

    </div>
  );
};

export default AddComment;