import type { ProjectSettings } from "./types";

/** Заменить: GET/PUT /api/projects/settings */
export const settingsMock: ProjectSettings = {
  projectName: "Astana Legal Hub",
  niche: "B2B юр.сопровождение",
  city: "Алматы",
  emailNotify: "team@example.kz",
  telegramUser: "@legalops_bot",
};
