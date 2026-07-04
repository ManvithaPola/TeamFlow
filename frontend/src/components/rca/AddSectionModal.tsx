import { useState } from "react";

interface Props {
  open: boolean;

  loading: boolean;

  onClose: () => void;

  onSubmit: (
    title: string,
    content: string,
  ) => Promise<void>;
}

const AddSectionModal = ({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) => {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    await onSubmit(title, content);

    setTitle("");

    setContent("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8">

        <h2 className="text-2xl font-semibold">
          Add Section
        </h2>

        <div className="mt-6 space-y-5">

          <input
            placeholder="Section Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
            "
          />

          <textarea
            rows={8}
            placeholder="Section Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
            "
          />

        </div>

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
              : "Create Section"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddSectionModal;