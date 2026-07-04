import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { useRCASections } from "../../hooks/useRCASections";
import DeleteSectionDialog from "./DeleteSectionDialog";
import type { RCASection } from "../../types/rcaSection.types";

import SectionCard from "./SectionCard";
import AddSectionModal from "./AddSectionModal";
import SectionEditor from "./SectionEditor";

interface Props {
  rcaId: string;
}

const SectionList = ({ rcaId }: Props) => {
  const {
    sections,
    loading,
    getSections,
    createSection,
    updateSection,
    deleteSection,
  } = useRCASections();

  const [openAdd, setOpenAdd] = useState(false);

  const [editing, setEditing] = useState<RCASection | null>(null);
  const [deleteSectionData, setDeleteSectionData] = useState<RCASection | null>(
    null,
  );

  useEffect(() => {
    getSections(rcaId);
  }, [rcaId]);

  return (
    <>
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
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">RCA Sections</h2>

            <p className="mt-1 text-sm text-slate-500">
              Document the complete investigation.
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#5B21B6]
              px-5
              py-3
              text-white
            "
          >
            <Plus size={18} />
            Add Section
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="py-10 text-center text-slate-500">Loading...</div>
        )}

        {/* Empty */}

        {!loading && sections.length === 0 && (
          <div className="py-10 text-center text-slate-500">
            No sections added.
          </div>
        )}

        {/* Sections */}

        <div className="space-y-5">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onEdit={setEditing}
              onDelete={(id) => {
                const section = sections.find((s) => s.id === id);

                if (section) {
                  setDeleteSectionData(section);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Add */}

      <AddSectionModal
        open={openAdd}
        loading={loading}
        onClose={() => setOpenAdd(false)}
        onSubmit={async (title, content) =>
          createSection({
            rcaId,
            sectionTitle: title,
            content,
          })
        }
      />

      {/* Edit */}

      {editing && (
        <SectionEditor
          section={editing}
          loading={loading}
          onClose={() => setEditing(null)}
          onSubmit={async (data) => {
            await updateSection(editing.id, data);

            setEditing(null);
          }}
        />
      )}
      <DeleteSectionDialog
        open={!!deleteSectionData}
        loading={loading}
        sectionTitle={deleteSectionData?.sectionTitle ?? ""}
        onClose={() => setDeleteSectionData(null)}
        onConfirm={async () => {
          if (!deleteSectionData) return;

          await deleteSection(deleteSectionData.id);

          setDeleteSectionData(null);
        }}
      />
    </>
  );
};

export default SectionList;
