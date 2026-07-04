interface Props {
  open: boolean;

  loading: boolean;

  fileName: string;

  onClose: () => void;

  onConfirm: () => Promise<void>;
}

const DeleteAttachmentDialog = ({
  open,
  loading,
  fileName,
  onClose,
  onConfirm,
}: Props) => {
  if (!open) return null;

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
          max-w-md
          rounded-3xl
          bg-white
          p-8
        "
      >
        <h2 className="text-xl font-semibold">
          Delete Attachment
        </h2>

        <p className="mt-4 text-slate-600">
          Delete "{fileName}"?
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              px-5
              py-3
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-3
              text-white
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAttachmentDialog;