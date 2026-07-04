import { useContext } from "react";

import { CommentContext } from "../contexts/CommentContext";

export const useComments = () => {
  const context =
    useContext(CommentContext);

  if (!context) {
    throw new Error(
      "useComments must be used inside CommentProvider",
    );
  }

  return context;
};