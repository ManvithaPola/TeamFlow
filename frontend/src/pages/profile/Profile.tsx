// ============================================
// 📄 src/pages/profile/Profile.tsx
// ============================================

import { useState } from "react";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfo from "../../components/profile/ProfileInfo";
import EditProfileDialog from "../../components/profile/EditProfileDialog";

import { useProfile } from "../../hooks/useProfile";

const Profile = () => {
  const {
    profile,
    loading,
    error,
    updateProfile,
  } = useProfile();

  const [showEdit, setShowEdit] =
    useState(false);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6 p-6">

        <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />

        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-8 p-6">

      <ProfileHeader
        profile={profile}
        onEdit={() =>
          setShowEdit(true)
        }
      />

      <ProfileInfo
        profile={profile}
      />

      {showEdit && (
        <EditProfileDialog
          profile={profile}
          onClose={() =>
            setShowEdit(false)
          }
          onSave={async (data) => {
            await updateProfile(data);

            setShowEdit(false);
          }}
        />
      )}

    </div>
  );
};

export default Profile;