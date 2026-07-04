import api from "../api/axios";

import type {
  Attachment,
  UploadAttachmentRequest,
} from "../types/attachment.types";

class AttachmentService {
  // ==========================================
  // UPLOAD
  // ==========================================

  async upload(
    data: UploadAttachmentRequest,
  ): Promise<Attachment> {
    const formData = new FormData();

    formData.append(
      "file",
      data.file,
    );

    if (data.taskId) {
      formData.append(
        "taskId",
        data.taskId,
      );
    }

    if (data.rcaId) {
      formData.append(
        "rcaId",
        data.rcaId,
      );
    }

    const response =
      await api.post(
        "/attachments/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return response.data.data;
  }

  // ==========================================
  // TASK ATTACHMENTS
  // ==========================================

  async getTaskAttachments(
    taskId: string,
  ): Promise<Attachment[]> {
    const response =
      await api.get(
        `/attachments/task/${taskId}`,
      );

    return response.data.data;
  }

  // ==========================================
  // RCA ATTACHMENTS
  // ==========================================

  async getRCAAttachments(
    rcaId: string,
  ): Promise<Attachment[]> {
    const response =
      await api.get(
        `/attachments/rca/${rcaId}`,
      );

    return response.data.data;
  }

  // ==========================================
  // DELETE
  // ==========================================

  async deleteAttachment(
    id: string,
  ) {
    await api.delete(
      `/attachments/${id}`,
    );
  }
}

export default new AttachmentService();