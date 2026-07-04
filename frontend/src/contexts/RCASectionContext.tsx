import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";

import RCASectionService from "../services/rcaSection.service";

import type {
  RCASection,
  CreateSectionRequest,
  UpdateSectionRequest,
  ReorderSectionsRequest,
} from "../types/rcaSection.types";

// ============================================
// CONTEXT TYPE
// ============================================

interface RCASectionContextType {
  sections: RCASection[];

  loading: boolean;

  error: string | null;

  getSections: (
    rcaId: string,
  ) => Promise<void>;

  createSection: (
    data: CreateSectionRequest,
  ) => Promise<void>;

  updateSection: (
    id: string,
    data: UpdateSectionRequest,
  ) => Promise<void>;

  deleteSection: (
    id: string,
  ) => Promise<void>;

  reorderSections: (
    data: ReorderSectionsRequest,
  ) => Promise<void>;
}

export const RCASectionContext =
  createContext<
    RCASectionContextType | undefined
  >(undefined);

// ============================================
// PROVIDER
// ============================================

interface Props {
  children: ReactNode;
}

export const RCASectionProvider = ({
  children,
}: Props) => {
  const [sections, setSections] =
    useState<RCASection[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [currentRCAId, setCurrentRCAId] =
    useState<string>("");

  // ==========================================
  // GET SECTIONS
  // ==========================================

  const getSections = useCallback(
    async (rcaId: string) => {
      try {
        setLoading(true);

        setError(null);

        setCurrentRCAId(rcaId);

        const data =
          await RCASectionService.getSections(
            rcaId,
          );

        setSections(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ??
            "Failed to fetch sections",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // ==========================================
  // CREATE
  // ==========================================

  const createSection = async (
    data: CreateSectionRequest,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await RCASectionService.createSection(
        data,
      );

      await getSections(data.rcaId);
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to create section",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE
  // ==========================================

  const updateSection = async (
    id: string,
    data: UpdateSectionRequest,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await RCASectionService.updateSection(
        id,
        data,
      );

      if (currentRCAId) {
        await getSections(currentRCAId);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to update section",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const deleteSection = async (
    id: string,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await RCASectionService.deleteSection(
        id,
      );

      if (currentRCAId) {
        await getSections(currentRCAId);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to delete section",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REORDER
  // ==========================================

  const reorderSections = async (
    data: ReorderSectionsRequest,
  ) => {
    try {
      setLoading(true);

      setError(null);

      await RCASectionService.reorderSections(
        data,
      );

      if (currentRCAId) {
        await getSections(currentRCAId);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to reorder sections",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <RCASectionContext.Provider
      value={{
        sections,
        loading,
        error,
        getSections,
        createSection,
        updateSection,
        deleteSection,
        reorderSections,
      }}
    >
      {children}
    </RCASectionContext.Provider>
  );
};

export default RCASectionProvider;