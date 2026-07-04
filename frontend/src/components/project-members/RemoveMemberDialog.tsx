// ============================================
// 📄 RemoveMemberDialog.tsx
// ============================================

import { Trash2 } from "lucide-react";

import ProjectMemberService from "../../services/projectMember.service";

interface Props {

  projectId: string;

  memberId: string;

  memberName: string;

  onClose: () => void;

  onRemoved: () => void;

}

const RemoveMemberDialog = ({
  projectId,
  memberId,
  memberName,
  onClose,
  onRemoved,
}: Props) => {

  const remove = async () => {

    await ProjectMemberService.removeMember(

      projectId,

      memberId,

    );

    onRemoved();

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-3xl bg-white p-6">

        <div className="flex flex-col items-center">

          <div className="rounded-full bg-red-100 p-4">

            <Trash2 className="text-red-600" />

          </div>

          <h2 className="mt-5 text-xl font-semibold">

            Remove Member

          </h2>

          <p className="mt-2 text-center text-slate-500">

            Remove

            <strong>

              {" "}
              {memberName}

            </strong>

            {" "}from this project?

          </p>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >

            Cancel

          </button>

          <button
            onClick={remove}
            className="rounded-xl bg-red-600 px-5 py-2 text-white"
          >

            Remove

          </button>

        </div>

      </div>

    </div>

  );

};

export default RemoveMemberDialog;