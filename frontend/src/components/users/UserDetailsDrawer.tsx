// ============================================
// 📄 UserDetailsDrawer.tsx
// ============================================

import { X } from "lucide-react";

import type { User } from "../../types/user.types";

interface Props {
  user: User;

  onClose: () => void;
}

const UserDetailsDrawer = ({
  user,
  onClose,
}: Props) => {

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">

      <div className="h-full w-[420px] bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold">

            User Details

          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >

            <X size={20} />

          </button>

        </div>

        <div className="space-y-6 p-6">

          <div>

            <p className="text-sm text-slate-500">
              Name
            </p>

            <h3 className="font-semibold">
              {user.name}
            </h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Email
            </p>

            <h3>{user.email}</h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Role
            </p>

            <h3>{user.role}</h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Assigned Tasks
            </p>

            <h3>{user._count.assignedTasks}</h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              RCAs Created
            </p>

            <h3>{user._count.createdRCAs}</h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Notifications
            </p>

            <h3>{user._count.notifications}</h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Joined
            </p>

            <h3>

              {new Date(
                user.createdAt,
              ).toLocaleDateString()}

            </h3>

          </div>

        </div>

      </div>

    </div>

  );

};

export default UserDetailsDrawer;