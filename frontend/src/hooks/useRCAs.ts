import { useContext } from "react";
import { RCAContext } from "../contexts/RCAContext";

export const useRCAs = () => {
  const context = useContext(RCAContext);

  if (!context) {
    throw new Error(
      "useRCAs must be used inside RCAProvider",
    );
  }

  return context;
};