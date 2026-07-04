// ============================================
// 📄 useProjectMembers.ts
// ============================================

import { useContext } from "react";

import {
  ProjectMemberContext,
} from "../contexts/ProjectMemberContext";

export const useProjectMembers = () => {

  const context =
    useContext(
      ProjectMemberContext,
    );

  if (!context) {

    throw new Error(

      "useProjectMembers must be used inside ProjectMemberProvider",

    );

  }

  return context;

};