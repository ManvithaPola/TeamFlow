export interface RCASection {
  id: string;

  sectionTitle: string;

  content: string;

  order: number;

  rcaId: string;
}

// ============================================
// CREATE
// ============================================

export interface CreateSectionRequest {
  rcaId: string;

  sectionTitle: string;

  content: string;
}

// ============================================
// UPDATE
// ============================================

export interface UpdateSectionRequest {
  sectionTitle?: string;

  content?: string;

  order?: number;
}

// ============================================
// REORDER
// ============================================

export interface ReorderSectionItem {
  id: string;

  order: number;
}

export interface ReorderSectionsRequest {
  sections: ReorderSectionItem[];
}