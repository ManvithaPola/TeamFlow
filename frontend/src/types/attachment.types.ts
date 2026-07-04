export interface Attachment {
  id: string;

  fileName: string;

  fileUrl: string;

  fileType: string;

  fileSize: number;

  uploadedAt: string;

  taskId?: string;

  rcaId?: string;
}

export interface UploadAttachmentRequest {
  file: File;

  taskId?: string;

  rcaId?: string;
}