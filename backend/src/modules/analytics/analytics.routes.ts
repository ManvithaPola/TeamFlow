import { Router } from "express";

import AnalyticsController from "./analytics.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// ==========================================
// ANALYTICS
// ==========================================

router.get(

  "/",

  authenticate,

  AnalyticsController.getAnalytics,

);

export default router;