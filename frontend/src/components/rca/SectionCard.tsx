import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { RCASection } from "../../types/rcaSection.types";

interface Props {
  section: RCASection;

  onEdit: (section: RCASection) => void;

  onDelete: (id: string) => void;
}

const SectionCard = ({
  section,
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
        p-6
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-slate-800">
            {section.sectionTitle}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Section #{section.order}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(section)}
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
            onClick={() => onDelete(section.id)}
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

      {/* Content */}

      <div className="mt-5 whitespace-pre-wrap leading-7 text-slate-600">
        {section.content}
      </div>

    </div>
  );
};

export default SectionCard;