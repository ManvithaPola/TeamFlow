// ============================================
// 📄 src/components/profile/EditProfileDialog.tsx
// ============================================

import { useState } from "react";

import type {
  Profile,
  UpdateProfileDTO,
} from "../../types/profile.types";

interface Props {
  profile: Profile;

  onClose: () => void;

  onSave: (
    data: UpdateProfileDTO,
  ) => Promise<void>;
}

const EditProfileDialog = ({
  profile,
  onClose,
  onSave,
}: Props) => {
  const [form, setForm] =
    useState<UpdateProfileDTO>({
      name: profile.name,
      email: profile.email,
      theme: profile.theme,
    });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSave(form);

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8">

        <h2 className="mb-6 text-2xl font-semibold">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Theme
            </label>

            <select
              value={form.theme}
              onChange={(e) =>
                setForm({
                  ...form,
                  theme: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
            >
              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#5B21B6] px-5 py-3 text-white disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProfileDialog;