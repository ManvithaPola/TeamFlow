// ============================================
// 📄 AddMemberDialog.tsx
// ============================================

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import ProjectMemberService from "../../services/projectMember.service";

import type {
  AvailableUser,
  ProjectRole,
} from "../../types/projectMember.types";

interface Props {

  projectId: string;

  onClose: () => void;

  onAdded: () => void;

}

const AddMemberDialog = ({
  projectId,
  onClose,
  onAdded,
}: Props) => {

  const [users, setUsers] =
    useState<AvailableUser[]>([]);

  const [selectedUser, setSelectedUser] =
    useState("");

  const [role, setRole] =
    useState<ProjectRole>("DEVELOPER");

  useEffect(() => {

    ProjectMemberService
      .getAvailableUsers(projectId)
      .then(setUsers);

  }, [projectId]);

  const handleSubmit = async () => {

    if (!selectedUser) return;

    await ProjectMemberService.addMember(

      projectId,

      {

        userId: selectedUser,

        role,

      },

    );

    onAdded();

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-xl font-semibold">

            Add Member

          </h2>

          <button onClick={onClose}>

            <X />

          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label>User</label>

            <select
              value={selectedUser}
              onChange={(e) =>
                setSelectedUser(
                  e.target.value,
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
            >

              <option value="">

                Select User

              </option>

              {users.map((user) => (

                <option
                  key={user.id}
                  value={user.id}
                >

                  {user.name}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label>

              Project Role

            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value as ProjectRole,
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
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

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >

            Cancel

          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-[#5B21B6] px-5 py-2 text-white"
          >

            Add Member

          </button>

        </div>

      </div>

    </div>

  );

};

export default AddMemberDialog;