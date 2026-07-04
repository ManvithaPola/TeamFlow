interface Props {
  open: boolean;

  loading: boolean;

  sectionTitle: string;

  onClose: () => void;

  onConfirm: () => Promise<void>;
}

const DeleteSectionDialog = ({
  open,
  loading,
  sectionTitle,
  onClose,
  onConfirm,
}: Props) => {
  if (!open) return null;

  const handleDelete = async () => {
    await onConfirm();

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
          max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-xl
        "
      >
        <h2 className="text-xl font-semibold text-slate-800">
          Delete Section
        </h2>

        <p className="mt-4 text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            "{sectionTitle}"
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              px-5
              py-3
              font-medium
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-3
              font-medium
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteSectionDialog;