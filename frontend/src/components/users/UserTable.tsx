// ============================================
// 📄 UserTable.tsx
// ============================================

import { Edit, Trash2, Eye } from "lucide-react";

import type { User } from "../../types/user.types";

interface Props {
  users: User[];

  onView: (user: User) => void;

  onEdit: (user: User) => void;

  onDelete: (user: User) => void;
}

const UserTable = ({ users, onView, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>

            <th className="px-6 py-4 text-left">Email</th>

            <th className="px-6 py-4 text-center">Role</th>

            <th className="px-6 py-4 text-center">Tasks</th>

            <th className="px-6 py-4 text-center">RCAs</th>

            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-16 text-center text-slate-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-5 font-medium">{user.name}</td>

                <td className="px-6 py-5">{user.email}</td>

                <td className="px-6 py-5 text-center">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  {user._count.assignedTasks}
                </td>

                <td className="px-6 py-5 text-center">
                  {user._count.createdRCAs}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onView(user)}
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(user)}
                      className="rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(user)}
                      className="rounded-lg p-2 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
