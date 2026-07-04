// ============================================
// 📄 src/contexts/RCAContext.tsx
// ============================================

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import RCAService from "../services/rca.service";

import type {
  RCA,
  RCAStatus,
  CreateRCARequest,
  UpdateRCARequest,
  ReviewRCARequest,
} from "../types/rca.types";

// ============================================
// CONTEXT TYPE
// ============================================

interface RCAContextType {
  rcas: RCA[];

  rca: RCA | null;

  loading: boolean;

  error: string | null;

  refresh: () => Promise<void>;

  getRCA: (id: string) => Promise<void>;

  createRCA: (data: CreateRCARequest) => Promise<void>;

  updateRCA: (id: string, data: UpdateRCARequest) => Promise<void>;

  deleteRCA: (id: string) => Promise<void>;

  submitRCA: (id: string) => Promise<void>;

  reviewRCA: (id: string, data: ReviewRCARequest) => Promise<void>;

  closeRCA: (id: string) => Promise<void>;

  getRCAsByProject: (projectId: string) => Promise<RCA[]>;
}

export const RCAContext = createContext<RCAContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

interface Props {
  children: ReactNode;
}

export const RCAProvider = ({ children }: Props) => {
  // ========================================
  // STATE
  // ========================================

  const [rcas, setRCAs] = useState<RCA[]>([]);

  const [rca, setRCA] = useState<RCA | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  // ========================================
  // GET ALL RCAs
  // ========================================

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await RCAService.getRCAs();

      setRCAs(data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to load RCAs");
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // GET SINGLE RCA
  // ========================================

  const getRCA = useCallback(async (id: string) => {
    try {
      setLoading(true);

      setError(null);

      const data = await RCAService.getRCA(id);

      setRCA(data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to fetch RCA");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);
  // ========================================
  // CREATE RCA
  // ========================================

  const createRCA = async (data: CreateRCARequest) => {
    try {
      setLoading(true);

      setError(null);

      await RCAService.createRCA(data);

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create RCA");

      throw err;
    } finally {
      setLoading(false);
    }
  };
  // ========================================
  // UPDATE RCA
  // ========================================

  const updateRCA = async (id: string, data: UpdateRCARequest) => {
    try {
      setLoading(true);

      setError(null);

      await RCAService.updateRCA(id, data);

      await getRCA(id);

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to update RCA");

      throw err;
    } finally {
      setLoading(false);
    }
  };
  // ========================================
  // DELETE RCA
  // ========================================

  const deleteRCA = async (id: string) => {
    try {
      setLoading(true);

      setError(null);

      await RCAService.deleteRCA(id);

      if (rca?.id === id) {
        setRCA(null);
      }

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to delete RCA");

      throw err;
    } finally {
      setLoading(false);
    }
  };
  // ========================================
  // SUBMIT RCA
  // ========================================

  const submitRCA = async (id: string) => {
    try {
      await RCAService.submitRCA(id);

      await getRCA(id);

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to submit RCA");

      throw err;
    }
  };
  // ========================================
  // REVIEW RCA
  // ========================================

  const reviewRCA = async (id: string, data: ReviewRCARequest) => {
    try {
      await RCAService.reviewRCA(id, data);

      await getRCA(id);

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to review RCA");

      throw err;
    }
  };
  // ========================================
  // CLOSE RCA
  // ========================================

  const closeRCA = async (id: string) => {
    try {
      await RCAService.closeRCA(id);

      await getRCA(id);

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to close RCA");

      throw err;
    }
  };
  // ========================================
  // GET RCAs BY PROJECT
  // ========================================

  const getRCAsByProject = async (projectId: string): Promise<RCA[]> => {
    return RCAService.getRCAsByProject(projectId);
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <RCAContext.Provider
      value={{
        rcas,
        rca,
        loading,
        error,
        refresh,
        getRCA,
        createRCA,
        updateRCA,
        deleteRCA,
        submitRCA,
        reviewRCA,
        closeRCA,
        getRCAsByProject,
      }}
    >
      {children}
    </RCAContext.Provider>
  );
};

export default RCAProvider;
