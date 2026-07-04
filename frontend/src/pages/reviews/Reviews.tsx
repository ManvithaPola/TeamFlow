// ============================================
// 📄 src/pages/reviews/Reviews.tsx
// ============================================

import {
  CheckCircle2,
  Clock3,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { useReviews } from "../../hooks/useReviews";

const Reviews = () => {
  const {
    reviews,
    loading,
    error,
    refresh,
    updateReview,
  } = useReviews();

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6 p-6">

        <div className="h-14 animate-pulse rounded-xl bg-slate-200" />

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-5">

        <h2 className="text-lg font-semibold text-red-500">
          {error}
        </h2>

        <button
          onClick={refresh}
          className="flex items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-3 text-white"
        >
          <RefreshCw size={18} />

          Retry
        </button>

      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          RCA Reviews
        </h1>

        <p className="mt-2 text-slate-500">
          Manage and review submitted Root Cause Analyses.
        </p>

      </div>

      {/* Reviews */}

      <div className="space-y-5">

        {reviews.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center">

            <p className="text-slate-500">
              No reviews found.
            </p>

          </div>

        ) : (

          reviews.map((review) => (

            <div
              key={review.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-lg font-semibold">
                    {review.rca.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {review.rca.project.title}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    Reviewer:
                    <span className="ml-1 font-medium">
                      {review.reviewer.name}
                    </span>
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    Severity:
                    <span className="ml-1 font-medium">
                      {review.rca.severity}
                    </span>
                  </p>

                  {review.comment && (
                    <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                      {review.comment}
                    </p>
                  )}

                </div>

                <div className="flex flex-col items-end gap-3">

                  <span
                    className={`
                      rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        review.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : review.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}
                  >
                    {review.status.replace("_", " ")}
                  </span>

                  {review.status === "PENDING" && (

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          updateReview(review.id, {
                            status: "APPROVED",
                            comment: "Approved",
                          })
                        }
                        className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      >
                        <CheckCircle2 size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateReview(review.id, {
                            status: "REJECTED",
                            comment: "Rejected",
                          })
                        }
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      >
                        <XCircle size={18} />
                      </button>

                    </div>

                  )}

                  {review.reviewedAt && (

                    <div className="flex items-center gap-2 text-xs text-slate-400">

                      <Clock3 size={14} />

                      {new Date(
                        review.reviewedAt,
                      ).toLocaleDateString()}

                    </div>

                  )}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Reviews;