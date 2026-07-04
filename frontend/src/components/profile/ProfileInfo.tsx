// ============================================
// 📄 src/components/profile/ProfileInfo.tsx
// ============================================

import {
  User,
  Mail,
  Shield,
  Palette,
  Calendar,
} from "lucide-react";

import type { Profile } from "../../types/profile.types";

interface Props {
  profile: Profile;
}

const ProfileInfo = ({
  profile,
}: Props) => {
  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-violet-100 p-2 text-[#5B21B6]">
          {icon}
        </div>

        <span className="font-medium text-slate-600">
          {label}
        </span>
      </div>

      <span className="font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Personal Information
      </h2>

      <div className="space-y-4">

        <InfoRow
          icon={<User size={18} />}
          label="Name"
          value={profile.name}
        />

        <InfoRow
          icon={<Mail size={18} />}
          label="Email"
          value={profile.email}
        />

        <InfoRow
          icon={<Shield size={18} />}
          label="Role"
          value={profile.role}
        />

        <InfoRow
          icon={<Palette size={18} />}
          label="Theme"
          value={profile.theme}
        />

        <InfoRow
          icon={<Calendar size={18} />}
          label="Member Since"
          value={new Date(
            profile.createdAt,
          ).toLocaleDateString()}
        />

      </div>
    </div>
  );
};

export default ProfileInfo;