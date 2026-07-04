import {
  Download,
  Trash2,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  FileVideo,
  FileAudio,
} from "lucide-react";

import { API_BASE_URL } from "../../config/api";
import type { Attachment } from "../../types/attachment.types";

interface Props {
  attachment: Attachment;
  onDelete: (id: string) => void;
}

const AttachmentCard = ({
  attachment,
  onDelete,
}: Props) => {
  const getIcon = () => {
    if (attachment.fileType.includes("image"))
      return <FileImage size={24} />;

    if (attachment.fileType.includes("pdf"))
      return <FileText size={24} />;

    if (
      attachment.fileType.includes("sheet") ||
      attachment.fileType.includes("excel")
    )
      return <FileSpreadsheet size={24} />;

    if (
      attachment.fileType.includes("zip") ||
      attachment.fileType.includes("rar")
    )
      return <FileArchive size={24} />;

    if (attachment.fileType.includes("video"))
      return <FileVideo size={24} />;

    if (attachment.fileType.includes("audio"))
      return <FileAudio size={24} />;

    return <FileText size={24} />;
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition
        hover:shadow-md
      "
    >
      <div className="flex justify-center">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-violet-100
            text-violet-700
          "
        >
          {getIcon()}
        </div>
      </div>

      <h3
        className="
          mt-4
          text-center
          text-sm
          font-semibold
          text-slate-800
          break-words
        "
      >
        {attachment.fileName}
      </h3>

      <p className="mt-2 text-center text-xs text-slate-500">
        {(attachment.fileSize / 1024).toFixed(1)} KB
      </p>

      <div className="mt-5 flex justify-center gap-3">
        <a
          href={`${API_BASE_URL}${attachment.fileUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            hover:bg-slate-100
          "
        >
          <Download size={18} />
        </a>

        <button
          onClick={() => onDelete(attachment.id)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-red-200
            text-red-600
            hover:bg-red-50
          "
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default AttachmentCard;