import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  FileText,
  Bell,
  User,
  LogOut,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    title: "RCA",
    icon: FileText,
    path: "/rca",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export const logoutItem = {
  title: "Logout",
  icon: LogOut,
  path: "/",
};