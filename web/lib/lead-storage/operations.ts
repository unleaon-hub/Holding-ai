import type { LeadStatus } from "@/data/cabinet/types";
import { persistLeads, readLeadsState, subscribeLeadsChanged } from "./storage";
import type { CreateLeadInput, StoredLead } from "./types";

const MIN_NAME = 1;
const MIN_CONTACT = 4;

function newId(): string {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateInput(input: CreateLeadInput): { ok: true } | { ok: false; error: string } {
  const name = input.name.trim();
  const c = input.phoneOrContact.trim();
  if (name.length < MIN_NAME) {
    return { ok: false, error: "Укажите имя" };
  }
  if (c.length < MIN_CONTACT) {
    return { ok: false, error: "Укажите контакт (не короче 4 символов)" };
  }
  return { ok: true };
}

/**
 * Создать лид, привязанный к проекту. Без localStorage в UI.
 */
export function createLead(projectSlug: string, input: CreateLeadInput): { ok: true; lead: StoredLead } | { ok: false; error: string } {
  const v = validateInput(input);
  if (!v.ok) {
    return v;
  }
  const s = readLeadsState();
  const lead: StoredLead = {
    id: newId(),
    projectSlug: projectSlug.trim(),
    name: input.name.trim(),
    phoneOrContact: input.phoneOrContact.trim(),
    message: input.message?.trim() || undefined,
    source: input.source,
    section: input.section,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const next = [...s.leads, lead];
  persistLeads(next);
  return { ok: true, lead };
}

export function getLeads(projectSlug: string): StoredLead[] {
  const slug = projectSlug.trim();
  return readLeadsState().leads.filter((l) => l.projectSlug === slug);
}

export function updateLeadStatus(
  projectSlug: string,
  leadId: string,
  status: LeadStatus,
): { ok: true } | { ok: false; error: string } {
  const slug = projectSlug.trim();
  const s = readLeadsState();
  const idx = s.leads.findIndex((l) => l.id === leadId && l.projectSlug === slug);
  if (idx < 0) {
    return { ok: false, error: "Лид не найден" };
  }
  const next = [...s.leads];
  const cur = next[idx]!;
  next[idx] = { ...cur, status };
  persistLeads(next);
  return { ok: true };
}

export type LeadSummary = {
  byStatus: Record<LeadStatus, number>;
  new: number;
  inWork: number;
  closed: number;
  total: number;
};

const IN_WORK: LeadStatus[] = ["contacted", "negotiation", "deal"];

export function getLeadSummary(projectSlug: string): LeadSummary {
  const list = getLeads(projectSlug);
  const byStatus: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    negotiation: 0,
    deal: 0,
    closed: 0,
  };
  for (const l of list) {
    byStatus[l.status] = (byStatus[l.status] ?? 0) + 1;
  }
  const inWork = IN_WORK.reduce((a, k) => a + (byStatus[k] ?? 0), 0);
  return {
    byStatus,
    new: byStatus.new,
    inWork,
    closed: byStatus.closed,
    total: list.length,
  };
}

export { subscribeLeadsChanged };
