import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import ContactSupport from "../pages/support/ContactSupport";
// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import CreateProject from "../pages/projects/CreateProject";
import EditProject from "../pages/projects/EditProject";
import ProjectDetails from "../pages/projects/ProjectDetails";
import Tasks from "../pages/tasks/Tasks";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";
import TaskDetails from "../pages/tasks/TaskDetails";
import RCAs from "../pages/rca/RCAs";
import CreateRCA from "../pages/rca/CreateRCA";
import EditRCA from "../pages/rca/EditRCA";
import RCADetails from "../pages/rca/RCADetails";
import Notifications from "../pages/notifications/Notifications";
import Profile from "../pages/profile/Profile";
import Reports from "../pages/reports/Reports";
import Users from "../pages/users/Users";
import Reviews from "../pages/reviews/Reviews";
import KanbanView from "../pages/tasks/KanbanView";
import CalendarView from "../pages/tasks/CalendarView";
import ListView from "../pages/tasks/ListView";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= Public Routes ================= */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/contact-support" element={<ContactSupport />} />

        {/* ================= Protected Routes ================= */}

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/create" element={<CreateTask />} />

          <Route path="/tasks/:id" element={<TaskDetails />} />

          <Route path="/tasks/:id/edit" element={<EditTask />} />
          <Route path="/tasks/kanban" element={<KanbanView />} />
          <Route path="/tasks/calendar" element={<CalendarView />} />
          <Route path="/tasks/list" element={<ListView />} />
          {/* ============================================ */}
          {/* RCA */}
          {/* ============================================ */}

          <Route path="/rcas" element={<RCAs />} />

          <Route path="/rcas/create" element={<CreateRCA />} />

          <Route path="/rcas/:id" element={<RCADetails />} />

          <Route path="/rcas/:id/edit" element={<EditRCA />} />
          <Route path="/users" element={<Users />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ================= 404 Page ================= */}

        <Route
          path="*"
          element={
            <h1 className="flex h-screen items-center justify-center text-3xl font-semibold">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
