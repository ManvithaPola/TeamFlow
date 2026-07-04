// ============================================
// 📄 src/pages/users/Users.tsx
// ============================================

import { useState } from "react";

import { RefreshCw, UserPlus } from "lucide-react";

import { useUsers } from "../../hooks/useUsers";
import UserPagination from "../../components/users/UserPagination";
import UserFilters from "../../components/users/UserFilters";
import UserStats from "../../components/users/UserStats";
import UserTable from "../../components/users/UserTable";
import UserForm from "../../components/users/UserForm";
import type { User } from "../../types/user.types";

import DeleteUserDialog from "../../components/users/DeleteUserDialog";

import UserDetailsDrawer from "../../components/users/UserDetailsDrawer";
const Users = () => {
  const {
    users,

    total,

    page,

    totalPages,

    loading,

    filters,

    setFilters,

    refresh,
  } = useUsers();

  const [openForm, setOpenForm] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [showDrawer, setShowDrawer] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-20 animate-pulse rounded-3xl bg-slate-200" />

        <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* ======================================
          Header
      ====================================== */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Users</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all TeamFlow users
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refresh}
            className="rounded-xl border border-slate-300 p-3 hover:bg-slate-100"
          >
            <RefreshCw size={20} />
          </button>

          <button
            onClick={() => {
              setSelectedUser(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-3 text-white hover:bg-[#4C1D95]"
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* ======================================
          Stats
      ====================================== */}

      <UserStats
        totalUsers={total}
        currentPage={page}
        totalPages={totalPages}
      />

      {/* ======================================
          Filters
      ====================================== */}

      <UserFilters filters={filters} setFilters={setFilters} />

      {/* ======================================
          Table
      ====================================== */}

      <UserTable
        users={users}
        onView={(user) => {
          setSelectedUser(user);
          setShowDrawer(true);
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setOpenForm(true);
        }}
        onDelete={(user) => {
          setSelectedUser(user);
          setShowDelete(true);
        }}
      />

      <UserPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) =>
          setFilters((prev) => ({
            ...prev,
            page: newPage,
          }))
        }
      />

      {/* ======================================
          Create User
      ====================================== */}

      {openForm && (
        <UserForm
          user={selectedUser ?? undefined}
          onClose={() => {
            setOpenForm(false);
            setSelectedUser(null);
            refresh();
          }}
        />
      )}

      {showDrawer && selectedUser && (
        <UserDetailsDrawer
          user={selectedUser}
          onClose={() => {
            setShowDrawer(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDelete && selectedUser && (
        <DeleteUserDialog
          userId={selectedUser.id}
          userName={selectedUser.name}
          onClose={() => {
            setShowDelete(false);
            setSelectedUser(null);
          }}
          onDeleted={() => {
            setShowDelete(false);
            setSelectedUser(null);
            refresh();
          }}
        />
      )}
    </div>
  );
};

export default Users;
