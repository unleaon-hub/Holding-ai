"use client";

import type { ReactNode } from "react";
import { CabinetShell } from "./cabinet-shell";
import { CabinetEmptyState } from "./cabinet-empty-state";
import { useCabinetProject } from "./cabinet-project-provider";

/**
 * TODO: при backend — проверка сессии + загрузка проектов; без проекта — тот же empty state.
 */
export function CabinetEntry({ children }: { children: ReactNode }) {
  const { project } = useCabinetProject();

  if (!project) {
    return <CabinetEmptyState />;
  }

  return <CabinetShell>{children}</CabinetShell>;
}
