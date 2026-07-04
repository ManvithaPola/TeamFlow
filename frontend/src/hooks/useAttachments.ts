import { useContext } from "react";

import { AttachmentContext } from "../contexts/AttachmentContext";

export const useAttachments = () => {
  const context =
    useContext(
      AttachmentContext,
    );

  if (!context) {
    throw new Error(
      "useAttachments must be used inside AttachmentProvider",
    );
  }

  return context;
};