import { resolveSoloFormToProjectFields } from "@/lib/solo-site";
import { ensureEditableContent } from "./default-content";
import type { EditableContent, GeneratedProject, ProjectOwner, SiteSessionV1 } from "./types";

// TODO: sync с backend; ключ и версия — миграции при смене схемы
const STORAGE_KEY = "holding:site_session_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Стабильный сегмент URL: без кириллицы, чтобы путь не ломался в инфраструктуре. */
function makeProjectSlug(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export { buildDefaultContent } from "./default-content";

function readState(): SiteSessionV1 {
  if (!isBrowser()) {
    return { version: 1, project: null, owner: null };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { version: 1, project: null, owner: null };
    }
    const data = JSON.parse(raw) as SiteSessionV1;
    if (data?.version === 1 && (data.project === null || typeof data.project === "object")) {
      return {
        version: 1,
        project: data.project,
        owner: data.owner ?? null,
      };
    }
  } catch {
    // ignore
  }
  return { version: 1, project: null, owner: null };
}

function writeState(next: SiteSessionV1): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // квота / приватный режим
  }
  window.dispatchEvent(new Event("holding-site-session"));
}

/** Сохранить сгенерированный проект (заменяет текущий, если был). */
export function saveProject(project: GeneratedProject): void {
  const s = readState();
  writeState({ ...s, project });
}

/**
 * Собрать проект из формы /start и записать. Возвращает slug.
 * TODO: POST /api/projects/generate вместо локального объекта
 */
export function createProjectFromForm(input: {
  niche: string;
  city: string;
  contact: string;
}): string {
  const id = isBrowser() && "crypto" in globalThis && "randomUUID" in globalThis.crypto
    ? globalThis.crypto.randomUUID()
    : `proj-${Date.now()}`;

  const slug = makeProjectSlug();
  const resolved = resolveSoloFormToProjectFields({
    niche: input.niche,
    city: input.city,
    contact: input.contact,
  });

  const project: GeneratedProject = {
    id,
    slug,
    niche: resolved.niche,
    city: resolved.city,
    contact: resolved.contact,
    createdAt: new Date().toISOString(),
    registered: false,
    content: resolved.content,
  };

  saveProject(project);
  return slug;
}

function withEnsuredContent(p: GeneratedProject): GeneratedProject {
  return { ...p, content: ensureEditableContent(p.content) };
}

export function getProject(): GeneratedProject | null {
  const p = readState().project;
  if (!p) {
    return null;
  }
  return withEnsuredContent(p);
}

export function getProjectBySlug(slug: string): GeneratedProject | null {
  const p = getProject();
  if (!p || p.slug !== slug) {
    return null;
  }
  return p;
}

export function updateProject(
  partial: Partial<Omit<GeneratedProject, "content">> & { content?: Partial<EditableContent> },
): void {
  const s = readState();
  if (!s.project) {
    return;
  }
  const content =
    partial.content != null
      ? { ...s.project.content, ...partial.content }
      : s.project.content;
  const next: GeneratedProject = {
    ...s.project,
    ...partial,
    content,
  };
  writeState({ ...s, project: next });
}

export function getOwner(): ProjectOwner | null {
  return readState().owner;
}

export function isRegistered(): boolean {
  const s = readState();
  return s.project?.registered === true && s.owner != null;
}

/**
 * «Сохранение сайта» — привязка владельца, доступ к кабинету.
 * TODO: POST /api/claim
 */
export function setUser(name: string, email: string): void {
  const s = readState();
  if (!s.project) {
    return;
  }
  const owner: ProjectOwner = { name: name.trim(), email: email.trim() };
  const project: GeneratedProject = {
    ...s.project,
    registered: true,
    ownerName: owner.name,
    ownerEmail: owner.email,
  };
  writeState({ version: 1, project, owner });
}

export function clearSiteSession(): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event("holding-site-session"));
}

export function subscribeSession(cb: () => void): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }
  const h = () => {
    cb();
  };
  window.addEventListener("storage", h);
  window.addEventListener("holding-site-session", h as EventListener);
  return () => {
    window.removeEventListener("storage", h);
    window.removeEventListener("holding-site-session", h as EventListener);
  };
}
