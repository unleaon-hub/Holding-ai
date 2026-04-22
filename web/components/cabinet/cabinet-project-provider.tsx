"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getOwner,
  getProject,
  subscribeSession,
  type GeneratedProject,
  type ProjectOwner,
} from "@/lib/site-session";

type CabinetProjectContextValue = {
  project: GeneratedProject | null;
  owner: ProjectOwner | null;
  registered: boolean;
  refresh: () => void;
};

const CabinetProjectContext = createContext<CabinetProjectContextValue | null>(null);

export function CabinetProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);

  const refresh = useCallback(() => {
    setProject(getProject());
    setOwner(getOwner());
  }, []);

  useEffect(() => {
    refresh();
    return subscribeSession(refresh);
  }, [refresh]);

  const registered = project?.registered === true && owner != null;

  return (
    <CabinetProjectContext.Provider
      value={{ project, owner, registered, refresh }}
    >
      {children}
    </CabinetProjectContext.Provider>
  );
}

export function useCabinetProject(): CabinetProjectContextValue {
  const v = useContext(CabinetProjectContext);
  if (!v) {
    throw new Error("useCabinetProject: wrap with CabinetProjectProvider");
  }
  return v;
}
