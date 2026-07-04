import { useEffect, useState } from "react";

import type {
  RCASection,
  UpdateSectionRequest,
} from "../../types/rcaSection.types";

interface Props {
  section: RCASection;

  loading: boolean;

  onClose: () => void;

  onSubmit: (
    data: UpdateSectionRequest,
  ) => Promise<void>;
}

const SectionEditor = ({
  section,
  loading,
  onClose,
  onSubmit,
}: Props) => {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  useEffect(() => {
    setTitle(section.sectionTitle);

    setContent(section.content);
  }, [section]);

  const handleSubmit = async () => {
    await onSubmit({
      sectionTitle: title,
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
          Edit Section
        </h2>

        <div className="mt-6 space-y-5">

          <input
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
              outline-none
              focus:border-[#5B21B6]
            "
          />

          <textarea
            rows={10}
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
              outline-none
              focus:border-[#5B21B6]
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
              disabled:opacity-50
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

export default SectionEditor;