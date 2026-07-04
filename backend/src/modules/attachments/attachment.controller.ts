import { Request, Response } from "express";
import AttachmentService from "./attachment.service";

class AttachmentController {
  // ==========================================
  // UPLOAD ATTACHMENT
  // ==========================================

  // ==========================================
  // UPLOAD ATTACHMENT
  // ==========================================

  async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const attachment = await AttachmentService.upload({
        fileName: req.file.originalname,

        fileUrl: `/uploads/${req.file.filename}`,

        fileType: req.file.mimetype,

        fileSize: req.file.size,

        taskId: req.body.taskId,

        rcaId: req.body.rcaId,
      });

      return res.status(201).json({
        success: true,
        message: "Attachment uploaded successfully",
        data: attachment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================================
  // GET TASK ATTACHMENTS
  // ==========================================

  async getTaskAttachments(req: Request, res: Response) {
    try {
      const attachments = await AttachmentService.getTaskAttachments(
        req.params.taskId,
      );

      return res.json({
        success: true,

        data: attachments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // GET RCA ATTACHMENTS
  // ==========================================

  async getRcaAttachments(req: Request, res: Response) {
    try {
      const attachments = await AttachmentService.getRcaAttachments(
        req.params.rcaId,
      );

      return res.json({
        success: true,

        data: attachments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  // ==========================================
  // DELETE ATTACHMENT
  // ==========================================

  async delete(req: Request, res: Response) {
    try {
      await AttachmentService.deleteAttachment(req.params.id);

      return res.json({
        success: true,

        message: "Attachment deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  }
}

export default new AttachmentController();
