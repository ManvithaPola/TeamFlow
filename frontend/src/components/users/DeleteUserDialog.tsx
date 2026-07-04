// ============================================
// 📄 DeleteUserDialog.tsx
// ============================================

import { Trash2, X } from "lucide-react";

import UserService from "../../services/user.service";

interface Props {
  userId: string;

  userName: string;

  onClose: () => void;

  onDeleted: () => void;
}

const DeleteUserDialog = ({
  userId,
  userName,
  onClose,
  onDeleted,
}: Props) => {

  const handleDelete = async () => {

    try {

      await UserService.deleteUser(userId);

      onDeleted();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Delete User
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        <div className="mt-6">

          <div className="mb-5 flex justify-center">

            <div className="rounded-full bg-red-100 p-4">

              <Trash2
                size={32}
                className="text-red-600"
              />

            </div>

          </div>

          <p className="text-center text-slate-600">

            Delete

            <span className="font-semibold">

              {" "}
              {userName}

            </span>

            ?

          </p>

          <p className="mt-2 text-center text-sm text-slate-400">

            This action cannot be undone.

          </p>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-3"
          >

            Cancel

          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteUserDialog;