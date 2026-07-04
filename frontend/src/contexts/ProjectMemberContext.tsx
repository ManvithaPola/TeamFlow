// ============================================
// 📄 ProjectMemberContext.tsx
// ============================================

import {

  createContext,

  useCallback,

  useState,

  type ReactNode,

} from "react";

import ProjectMemberService from "../services/projectMember.service";

import type {

  ProjectMember,

  AvailableUser,

} from "../types/projectMember.types";

interface ContextType {

  members: ProjectMember[];

  availableUsers: AvailableUser[];

  loading: boolean;

  loadMembers: (
    projectId: string,
  ) => Promise<void>;

  refreshAvailableUsers: (
    projectId: string,
  ) => Promise<void>;

}

export const ProjectMemberContext =
  createContext<
    ContextType | undefined
  >(undefined);

export const ProjectMemberProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [members, setMembers] =
    useState<ProjectMember[]>([]);

  const [

    availableUsers,

    setAvailableUsers,

  ] = useState<
    AvailableUser[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const loadMembers =
    useCallback(
      async (
        projectId: string,
      ) => {

        setLoading(true);

        try {

          const members =
            await ProjectMemberService.getMembers(
              projectId,
            );

          setMembers(
            members,
          );

        } finally {

          setLoading(false);

        }

      },
      [],
    );

  const refreshAvailableUsers =
    useCallback(
      async (
        projectId: string,
      ) => {

        const users =
          await ProjectMemberService.getAvailableUsers(
            projectId,
          );

        setAvailableUsers(
          users,
        );

      },
      [],
    );

  return (

    <ProjectMemberContext.Provider
      value={{
        members,
        availableUsers,
        loading,
        loadMembers,
        refreshAvailableUsers,
      }}
    >

      {children}

    </ProjectMemberContext.Provider>

  );

};