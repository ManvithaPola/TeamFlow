// ============================================
// 📄 ReviewDecisionCard.tsx
// ============================================

import { useState } from "react";

interface Props {
  onSubmit: (
    status: "APPROVED" | "REJECTED",
    comment: string,
  ) => Promise<void>;
}

const ReviewDecisionCard = ({
  onSubmit,
}: Props) => {
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (
    status: "APPROVED" | "REJECTED",
  ) => {
    if (!comment.trim()) {
      alert("Comment is required.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(status, comment);

      setComment("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Review Decision
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Approve or reject this RCA.
      </p>

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        rows={5}
        placeholder="Enter your review comments..."
        className="mt-5 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#5B21B6]"
      />

      <div className="mt-5 flex gap-3">

        <button
          disabled={loading}
          onClick={() =>
            submit("APPROVED")
          }
          className="rounded-xl bg-green-600 px-5 py-2 text-white"
        >
          Approve
        </button>

        <button
          disabled={loading}
          onClick={() =>
            submit("REJECTED")
          }
          className="rounded-xl bg-red-600 px-5 py-2 text-white"
        >
          Reject
        </button>

      </div>

    </div>
  );
};

export default ReviewDecisionCard;