import { useContext } from "react";

import { RCASectionContext } from "../contexts/RCASectionContext";

export const useRCASections = () => {
  const context = useContext(
    RCASectionContext,
  );

  if (!context) {
    throw new Error(
      "useRCASections must be used inside RCASectionProvider",
    );
  }

  return context;
};