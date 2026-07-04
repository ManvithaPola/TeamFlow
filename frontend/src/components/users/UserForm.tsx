// ============================================
// 📄 UserForm.tsx
// ============================================

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import UserService from "../../services/user.service";

import type {
  User,
  CreateUserDTO,
} from "../../types/user.types";

interface Props {
  user?: User;

  onClose: () => void;
}

const UserForm = ({
  user,
  onClose,
}: Props) => {

  const isEdit = !!user;

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<CreateUserDTO>({
      name: "",
      email: "",
      password: "",
      role: "DEVELOPER",
    });

  useEffect(() => {

    if (user) {

      setForm({

        name: user.name,

        email: user.email,

        password: "",

        role: user.role,

      });

    }

  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]:
        e.target.value,

    }));

  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (isEdit) {

        await UserService.updateUser(
          user.id,
          {
            name: form.name,
            email: form.email,
            role: form.role,
          },
        );

      } else {

        await UserService.createUser(
          form,
        );

      }

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <h2 className="text-xl font-semibold">

            {isEdit
              ? "Edit User"
              : "Create User"}

          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >

            <X size={20} />

          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">

              Name

            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
              required
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Email

            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
              required
            />

          </div>

          {!isEdit && (

            <div>

              <label className="mb-2 block text-sm font-medium">

                Password

              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
                required
              />

            </div>

          )}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Role

            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
            >

              <option value="ADMIN">
                Admin
              </option>

              <option value="MANAGER">
                Manager
              </option>

              <option value="DEVELOPER">
                Developer
              </option>

              <option value="REVIEWER">
                Reviewer
              </option>

            </select>

          </div>

          {/* Footer */}

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
              className="rounded-xl bg-[#5B21B6] px-6 py-3 text-white hover:bg-[#4C1D95] disabled:opacity-50"
            >

              {loading
                ? "Saving..."
                : isEdit
                ? "Update User"
                : "Create User"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default UserForm;