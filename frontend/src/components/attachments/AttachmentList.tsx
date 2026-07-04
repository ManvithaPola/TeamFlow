import { useEffect, useState } from "react";

import { useAttachments } from "../../hooks/useAttachments";

import type { Attachment } from "../../types/attachment.types";

import UploadAttachment from "./UploadAttachment";
import AttachmentCard from "./AttachmentCard";
import DeleteAttachmentDialog from "./DeleteAttachmentDialog";

interface Props {
  taskId?: string;

  rcaId?: string;
}

const AttachmentList = ({ taskId, rcaId }: Props) => {
  const {
    attachments,
    loading,
    getTaskAttachments,
    getRCAAttachments,
    uploadAttachment,
    deleteAttachment,
  } = useAttachments();

  const [selected, setSelected] = useState<Attachment | null>(null);

  // ==========================================
  // LOAD ATTACHMENTS
  // ==========================================

  useEffect(() => {
    if (taskId) {
      getTaskAttachments(taskId);
    }

    if (rcaId) {
      getRCAAttachments(rcaId);
    }
  }, [taskId, rcaId, getTaskAttachments, getRCAAttachments]);

  // ==========================================
  // UPLOAD
  // ==========================================

  const handleUpload = async (file: File) => {
    await uploadAttachment({
      file,
      taskId,
      rcaId,
    });
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async () => {
    if (!selected) return;

    await deleteAttachment(selected.id);

    setSelected(null);
  };

  return (
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

      <div className="mb-6 border-b border-slate-100 pb-5">
        <h2 className="text-xl font-semibold text-slate-900">Attachments</h2>

        <div className="mt-4">
          <UploadAttachment loading={loading} onUpload={handleUpload} />
        </div>
      </div>

      {/* Empty */}

      {attachments.length === 0 && (
        <p className="text-slate-500">No attachments uploaded yet.</p>
      )}

      {/* List */}

      <div className="mt-6 space-y-3">
        {attachments.map((attachment) => (
          <AttachmentCard
            key={attachment.id}
            attachment={attachment}
            onDelete={() => setSelected(attachment)}
          />
        ))}
      </div>

      {/* Delete Dialog */}

      <DeleteAttachmentDialog
        open={!!selected}
        loading={loading}
        fileName={selected?.fileName ?? ""}
        onClose={() => setSelected(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AttachmentList;
