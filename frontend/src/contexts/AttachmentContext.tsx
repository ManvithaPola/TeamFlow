import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import AttachmentService from "../services/attachment.service";

import type {
  Attachment,
  UploadAttachmentRequest,
} from "../types/attachment.types";

interface AttachmentContextType {
  attachments: Attachment[];

  loading: boolean;

  error: string | null;

  getTaskAttachments: (
    taskId: string,
  ) => Promise<void>;

  getRCAAttachments: (
    rcaId: string,
  ) => Promise<void>;

  uploadAttachment: (
    data: UploadAttachmentRequest,
  ) => Promise<void>;

  deleteAttachment: (
    id: string,
  ) => Promise<void>;
}

export const AttachmentContext =
  createContext<
    AttachmentContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export const AttachmentProvider = ({
  children,
}: Props) => {
  const [
    attachments,
    setAttachments,
  ] = useState<Attachment[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [taskId, setTaskId] =
    useState("");

  const [rcaId, setRcaId] =
    useState("");

  // ==========================================

  const getTaskAttachments =
    useCallback(
      async (
        currentTaskId: string,
      ) => {
        setLoading(true);

        setTaskId(
          currentTaskId,
        );

        const data =
          await AttachmentService.getTaskAttachments(
            currentTaskId,
          );

        setAttachments(data);

        setLoading(false);
      },
      [],
    );

  // ==========================================

  const getRCAAttachments =
    useCallback(
      async (
        currentRcaId: string,
      ) => {
        setLoading(true);

        setRcaId(
          currentRcaId,
        );

        const data =
          await AttachmentService.getRCAAttachments(
            currentRcaId,
          );

        setAttachments(data);

        setLoading(false);
      },
      [],
    );

  // ==========================================

  const uploadAttachment =
    async (
      data: UploadAttachmentRequest,
    ) => {
      await AttachmentService.upload(
        data,
      );

      if (data.taskId) {
        await getTaskAttachments(
          data.taskId,
        );
      }

      if (data.rcaId) {
        await getRCAAttachments(
          data.rcaId,
        );
      }
    };

  // ==========================================

  const deleteAttachment =
    async (
      id: string,
    ) => {
      await AttachmentService.deleteAttachment(
        id,
      );

      if (taskId) {
        await getTaskAttachments(
          taskId,
        );
      }

      if (rcaId) {
        await getRCAAttachments(
          rcaId,
        );
      }
    };

  return (
    <AttachmentContext.Provider
      value={{
        attachments,

        loading,

        error,

        getTaskAttachments,

        getRCAAttachments,

        uploadAttachment,

        deleteAttachment,
      }}
    >
      {children}
    </AttachmentContext.Provider>
  );
};

export default AttachmentProvider;