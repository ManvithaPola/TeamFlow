import { createContext, useState, useMemo, type ReactNode } from "react";

export interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const openMobileSidebar = () => {
    setIsMobileOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const value = useMemo(
    () => ({
      isCollapsed,
      isMobileOpen,
      toggleSidebar,
      openMobileSidebar,
      closeMobileSidebar,
    }),
    [isCollapsed, isMobileOpen]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};