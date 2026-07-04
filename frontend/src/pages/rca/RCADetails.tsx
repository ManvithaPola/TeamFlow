// ============================================
// 📄 src/pages/rca/RCADetails.tsx
// ============================================

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  FolderKanban,
  Pencil,
  Send,
  ShieldCheck,
  Lock,
  Paperclip,
  MessageSquare,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

import { useRCAs } from "../../hooks/useRCAs";
import SectionList from "../../components/rca/SectionList";
import CommentList from "../../components/comments/CommentList";
import AttachmentList from "../../components/attachments/AttachmentList";
import ReviewDecisionCard from "../../components/rca/ReviewDecisionCard";
import { useAuth } from "../../hooks/useAuth";
const RCADetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { rca, loading, getRCA, submitRCA, closeRCA, reviewRCA } = useRCAs();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getRCA(id);
    }
  }, [id, getRCA]);
  const handleReview = async (
    status: "APPROVED" | "REJECTED",
    comment: string,
  ) => {
    if (!id) return;

    await reviewRCA(id, {
      status,
      comment,
    });

    await getRCA(id);
  };
  if (loading || !rca) {
    return <div className="p-10 text-center">Loading RCA...</div>;
  }
  const alreadyReviewed = rca.reviews.some(
    (review) => review.reviewer.id === user?.id,
  );
  console.log("Current RCA:", rca);
  console.log("Status:", rca.status);
  console.log("Role =", user.role);
  console.log("Already Reviewed:", alreadyReviewed);
  console.log("Current RCA ID:", rca.id);
  console.log("Reviews:", rca.reviews);
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            to="/rcas"
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              hover:text-[#5B21B6]
            "
          >
            <ArrowLeft size={16} />
            Back to RCAs
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F3F0FF]
                "
              >
                <AlertTriangle size={30} className="text-[#5B21B6]" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">{rca.title}</h1>

                <p className="mt-2 text-slate-500">{rca.project.title}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/rcas/${rca.id}/edit`)}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-5
                  py-3
                  font-medium
                  hover:bg-slate-50
                "
              >
                <Pencil size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* INFORMATION CARDS + MAIN CONTENT WRAPPER */}
      {/* ========================================= */}

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Project */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <FolderKanban size={22} className="text-[#5B21B6]" />

            <p className="mt-4 text-sm text-slate-500">Project</p>

            <h3 className="mt-2 font-semibold">{rca.project.title}</h3>
          </div>

          {/* Creator */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <ClipboardList size={22} className="text-[#5B21B6]" />

            <p className="mt-4 text-sm text-slate-500">Created By</p>

            <h3 className="mt-2 font-semibold">{rca.createdBy.name}</h3>
          </div>

          {/* Severity */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <AlertTriangle size={22} className="text-[#5B21B6]" />

            <p className="mt-4 text-sm text-slate-500">Severity</p>

            <h3 className="mt-2 font-semibold">{rca.severity}</h3>
          </div>

          {/* Created */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <CalendarDays size={22} className="text-[#5B21B6]" />

            <p className="mt-4 text-sm text-slate-500">Created</p>

            <h3 className="mt-2 font-semibold">
              {new Date(rca.createdAt).toLocaleDateString()}
            </h3>
          </div>
        </div>

        {/* ========================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================= */}

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Left */}

          <div className="space-y-6 xl:col-span-2">
            {/* Incident Summary Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Incident Summary</h2>

              <p className="leading-8 text-slate-600">{rca.incident}</p>
            </div>

            {/* RCA Sections */}
            {/* <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <h2 className="mb-8 text-xl font-semibold">
                RCA Sections
              </h2>

              {rca.sections.length === 0 ? (

                <p className="text-slate-500">
                  No sections added.
                </p>

              ) : (

                <div className="space-y-6">

                  {rca.sections.map((section) => (

                    <div
                      key={section.id}
                      className="
                        rounded-2xl
                        border
                        border-slate-100
                        bg-slate-50
                        p-5
                      "
                    >
                      <h3 className="font-semibold text-[#111827]">
                        {section.sectionTitle}
                      </h3>

                      <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-600">
                        {section.content}
                      </p>
                    </div>

                  ))}

                </div>

              )}

            </div> */}
            <SectionList rcaId={rca.id} />

            <CommentList rcaId={rca.id} />

            {user?.role === "REVIEWER" &&
              rca.status === "UNDER_REVIEW" &&
              !alreadyReviewed && (
                <ReviewDecisionCard onSubmit={handleReview} />
              )}

            {/* Reviews */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-8 text-xl font-semibold">Reviews</h2>

              {rca.reviews.length === 0 ? (
                <p className="text-slate-500">No reviews yet.</p>
              ) : (
                <div className="space-y-5">
                  {rca.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="
                        rounded-2xl
                        border
                        border-slate-100
                        p-5
                      "
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {review.reviewer.name}
                        </h3>

                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold

                            ${
                              review.status === "APPROVED"
                                ? "bg-emerald-100 text-emerald-700"
                                : review.status === "REJECTED"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-amber-100 text-amber-700"
                            }
                          `}
                        >
                          {review.status}
                        </span>
                      </div>

                      <p className="mt-3 text-slate-600">
                        {review.comment || "No comments"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}

          <div className="space-y-6">
            {/* Workflow Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold">Workflow</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>

                  <span className="font-semibold">{rca.status}</span>
                </div>

                <button
                  onClick={() => submitRCA(rca.id)}
                  disabled={rca.status !== "DRAFT"}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#5B21B6]
                    px-5
                    py-3
                    font-medium
                    text-white
                    disabled:cursor-not-allowed
                    disabled:bg-slate-300
                  "
                >
                  <Send size={18} />
                  Submit RCA
                </button>

                <button
                  onClick={() => closeRCA(rca.id)}
                  disabled={rca.status !== "APPROVED"}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-5
                    py-3
                    font-medium
                    disabled:cursor-not-allowed
                    disabled:bg-slate-100
                  "
                >
                  <Lock size={18} />
                  Close RCA
                </button>
              </div>
            </div>

            {/* Comments Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-[#5B21B6]" />

                <h2 className="font-semibold">Comments</h2>
              </div>

              <p className="mt-6 text-3xl font-bold">{rca._count.comments}</p>
            </div>

            {/* Attachments Summary */}
            <AttachmentList rcaId={rca.id} />

            {/* Reviews Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#5B21B6]" />

                <h2 className="font-semibold">Reviews</h2>
              </div>

              <p className="mt-6 text-3xl font-bold">{rca._count.reviews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCADetails;
