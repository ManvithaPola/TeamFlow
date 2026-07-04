// ============================================
// 📄 src/constants/navigation.ts
// ============================================

import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  FileWarning,
  Users,
  BarChart3,
  Bell,
  User,
  ClipboardCheck,
  LogOut,
} from "lucide-react";

import type { UserRole } from "../types/auth.types";

export interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export interface NavigationConfig {
  sidebar: NavigationItem[];
  logout: NavigationItem;
}

// =======================================================
// ADMIN
// =======================================================

const adminSidebar: NavigationItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: ListTodo,
  },
  {
    title: "RCAs",
    path: "/rcas",
    icon: FileWarning,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

// =======================================================
// MANAGER
// =======================================================

const managerSidebar: NavigationItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: ListTodo,
  },
  {
    title: "RCAs",
    path: "/rcas",
    icon: FileWarning,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

// =======================================================
// DEVELOPER
// =======================================================

const developerSidebar: NavigationItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "My Tasks",
    path: "/tasks",
    icon: ListTodo,
  },
  {
    title: "RCAs",
    path: "/rcas",
    icon: FileWarning,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

// =======================================================
// REVIEWER
// =======================================================

const reviewerSidebar: NavigationItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "RCAs",
    path: "/rcas",
    icon: FileWarning,
  },
  {
    title: "Reviews",
    path: "/reviews",
    icon: ClipboardCheck,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },

  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

// =======================================================
// LOGOUT
// =======================================================

const logoutItem: NavigationItem = {
  title: "Logout",
  path: "/login",
  icon: LogOut,
};

// =======================================================
// ROLE MAP
// =======================================================

export const navigation: Record<UserRole, NavigationConfig> = {
  ADMIN: {
    sidebar: adminSidebar,
    logout: logoutItem,
  },

  MANAGER: {
    sidebar: managerSidebar,
    logout: logoutItem,
  },

  DEVELOPER: {
    sidebar: developerSidebar,
    logout: logoutItem,
  },

  REVIEWER: {
    sidebar: reviewerSidebar,
    logout: logoutItem,
  },
};