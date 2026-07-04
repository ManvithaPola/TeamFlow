import { Router } from "express";
import CommentController from "./comment.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// ==========================================
// CREATE COMMENT
// ==========================================

router.post("/tasks/:id/comments", authenticate, CommentController.create);

// ==========================================
// GET COMMENTS OF A TASK
// ==========================================

router.get("/tasks/:id/comments", authenticate, CommentController.getAll);

// ==========================================
// UPDATE COMMENT
// ==========================================

router.put("/comments/:id", authenticate, CommentController.update);

// ==========================================
// DELETE COMMENT
// ==========================================

router.delete("/comments/:id", authenticate, CommentController.delete);

router.post("/rcas/:id/comments", authenticate, CommentController.createRCA);

router.get("/rcas/:id/comments", authenticate, CommentController.getRCA);

export default router;
