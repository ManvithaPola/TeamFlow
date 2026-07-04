import { Router } from "express";
import AttachmentController from "./attachment.controller";
import { authenticate } from "../../middleware/auth.middleware";
import upload from "../../middleware/upload.middleware";
const router = Router();

// Upload Attachment

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  AttachmentController.upload,
);

// Get Task Attachments

router.get(
  "/task/:taskId",
  authenticate,
  AttachmentController.getTaskAttachments
);

// Get RCA Attachments

router.get(
  "/rca/:rcaId",
  authenticate,
  AttachmentController.getRcaAttachments
);

// Delete Attachment

router.delete(
  "/:id",
  authenticate,
  AttachmentController.delete
);

export default router;