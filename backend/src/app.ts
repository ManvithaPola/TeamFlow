import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import projectRoutes from "./modules/projects/project.routes";
import taskRoutes from "./modules/tasks/task.routes";
import dependencyRoutes from "./modules/tasks/dependency.routes";
import commentRoutes from "./modules/comments/comment.routes";
import rcaRoutes from "./modules/rca/rca.routes";
import rcaSectionRoutes from "./modules/rca-sections/rcaSection.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import notificationRoutes from "./modules/notifications/notification.routes";
import activityRoutes from "./modules/activity/activity.routes";
import attachmentRoutes from "./modules/attachments/attachment.routes";
import { errorHandler } from "./middleware/error.middleware";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import userRoutes from "./modules/users/user.routes";
import path from "path";
import memberRoutes from "./modules/project-members/member.routes";
import reviewRoutes from "./modules/reviews/review.routes";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tasks", dependencyRoutes);
app.use("/api", commentRoutes);
app.use("/api/rcas", rcaRoutes);
app.use("/api/rca-sections", rcaSectionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api", memberRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(errorHandler);
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to TeamFlow API 🚀",
  });
});

export default app;
