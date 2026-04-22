import type { LeadsStateV1, StoredLead } from "./types";

const STORAGE_KEY = "holding:leads_v1";
export const LEADS_CHANGED_EVENT = "holding-leads-changed";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function emptyState(): LeadsStateV1 {
  return { version: 1, leads: [] };
}

export function readLeadsState(): LeadsStateV1 {
  if (!isBrowser()) {
    return emptyState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyState();
    }
    const data = JSON.parse(raw) as LeadsStateV1;
    if (data?.version === 1 && Array.isArray(data.leads)) {
      return { version: 1, leads: data.leads };
    }
  } catch {
    // ignore
  }
  return emptyState();
}

function writeLeadsState(next: LeadsStateV1): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // квота
  }
  window.dispatchEvent(new Event(LEADS_CHANGED_EVENT));
}

export function persistLeads(leads: StoredLead[]): void {
  writeLeadsState({ version: 1, leads });
}

export function subscribeLeadsChanged(cb: () => void): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }
  const h = () => {
    cb();
  };
  window.addEventListener("storage", h);
  window.addEventListener(LEADS_CHANGED_EVENT, h);
  return () => {
    window.removeEventListener("storage", h);
    window.removeEventListener(LEADS_CHANGED_EVENT, h);
  };
}
