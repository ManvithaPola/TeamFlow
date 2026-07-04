import api from "../api/axios";

import type {
  RCASection,
  CreateSectionRequest,
  UpdateSectionRequest,
  ReorderSectionsRequest,
} from "../types/rcaSection.types";

class RCASectionService {
  // ==========================================
  // GET SECTIONS
  // ==========================================

  async getSections(
    rcaId: string,
  ): Promise<RCASection[]> {
    const response = await api.get(
      `/rca-sections/rca/${rcaId}`,
    );

    return response.data.data;
  }

  // ==========================================
  // CREATE
  // ==========================================

  async createSection(
    data: CreateSectionRequest,
  ): Promise<RCASection> {
    const response = await api.post(
      "/rca-sections",
      data,
    );

    return response.data.data;
  }

  // ==========================================
  // UPDATE
  // ==========================================

  async updateSection(
    id: string,
    data: UpdateSectionRequest,
  ): Promise<RCASection> {
    const response = await api.put(
      `/rca-sections/${id}`,
      data,
    );

    return response.data.data;
  }

  // ==========================================
  // DELETE
  // ==========================================

  async deleteSection(
    id: string,
  ): Promise<void> {
    await api.delete(
      `/rca-sections/${id}`,
    );
  }

  // ==========================================
  // REORDER
  // ==========================================

  async reorderSections(
    data: ReorderSectionsRequest,
  ): Promise<void> {
    await api.put(
      "/rca-sections/reorder",
      data,
    );
  }
}

export default new RCASectionService();