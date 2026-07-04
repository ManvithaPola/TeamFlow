import { Paperclip } from "lucide-react";
import { useRef } from "react";

interface Props {
  loading: boolean;

  onUpload: (file: File) => Promise<void>;
}

const UploadAttachment = ({ loading, onUpload }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    await onUpload(file);

    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" hidden onChange={handleChange} />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-[#5B21B6]
    px-4
    py-3
    text-sm
    font-medium
    text-white
    transition
    hover:bg-[#4C1D95]
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
      >
        <Paperclip size={18} />

        {loading ? "Uploading..." : "Upload Attachment"}
      </button>
    </>
  );
};

export default UploadAttachment;
