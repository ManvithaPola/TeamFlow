// ============================================
// 📄 src/components/profile/ProfileHeader.tsx
// ============================================

import { Pencil } from "lucide-react";

import type { Profile } from "../../types/profile.types";

interface Props {
  profile: Profile;

  onEdit: () => void;
}

const ProfileHeader = ({
  profile,
  onEdit,
}: Props) => {
  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-5">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#5B21B6]
                to-indigo-600
                text-3xl
                font-bold
                text-white
              "
            >
              {initials}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {profile.name}
            </h1>

            <p className="mt-1 text-slate-500">
              {profile.email}
            </p>

            <span
              className="
                mt-4
                inline-flex
                rounded-full
                bg-violet-100
                px-4
                py-1
                text-sm
                font-semibold
                text-violet-700
              "
            >
              {profile.role}
            </span>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#5B21B6]
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-violet-700
          "
        >
          <Pencil size={18} />

          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;