"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface SidebarContextType {
  open: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<
  SidebarContextType | undefined
>(undefined);


interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({
  children,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(true);

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}


export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider"
    );
  }

  return context;
}