const BILLING_STORAGE_KEY = "holding:billing_v1";
const BILLING_CHANGED_EVENT = "holding-billing";
const TRIAL_DAYS = 7;
const INTENT_ACCESS_EXTENSION_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export type BillingStateV1 = {
  version: 1;
  trialStartedAt: string;
  trialEndsAt: string;
  /** One-time grace end after payment intent; absent in legacy payloads. */
  extendedUntil?: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isValidDateIso(value: string): boolean {
  return Number.isFinite(Date.parse(value));
}

function isValidState(value: unknown): value is BillingStateV1 {
  if (!value || typeof value !== "object") {
    return false;
  }
  const data = value as Partial<BillingStateV1>;
  if (data.version !== 1) {
    return false;
  }
  if (typeof data.trialStartedAt !== "string" || typeof data.trialEndsAt !== "string") {
    return false;
  }
  if (!isValidDateIso(data.trialStartedAt) || !isValidDateIso(data.trialEndsAt)) {
    return false;
  }
  if (data.extendedUntil !== undefined) {
    if (typeof data.extendedUntil !== "string" || !isValidDateIso(data.extendedUntil)) {
      return false;
    }
  }
  return Date.parse(data.trialEndsAt) > Date.parse(data.trialStartedAt);
}

function writeState(state: BillingStateV1): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(BILLING_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota/private mode errors
  }
  window.dispatchEvent(new Event(BILLING_CHANGED_EVENT));
}

export function getBillingState(): BillingStateV1 | null {
  if (!isBrowser()) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(BILLING_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (isValidState(parsed)) {
      return parsed;
    }
  } catch {
    // ignore broken storage payload
  }
  return null;
}

function getEffectiveAccessEndMsForState(state: BillingStateV1): number {
  const trialEndMs = Date.parse(state.trialEndsAt);
  const extendedCandidateMs =
    state.extendedUntil !== undefined ? Date.parse(state.extendedUntil) : trialEndMs;
  return Math.max(trialEndMs, extendedCandidateMs);
}

export function initTrialIfNeeded(now: Date = new Date()): BillingStateV1 | null {
  const existing = getBillingState();
  if (existing) {
    return existing;
  }
  if (!isBrowser()) {
    return null;
  }
  const startedAt = now;
  const endsAt = new Date(now.getTime() + TRIAL_DAYS * DAY_MS);
  const next: BillingStateV1 = {
    version: 1,
    trialStartedAt: startedAt.toISOString(),
    trialEndsAt: endsAt.toISOString(),
  };
  writeState(next);
  return next;
}

/**
 * One-time client-side extension after a new payment intent.
 * If `extendedUntil` was ever persisted, does nothing (including when the date is in the past).
 */
export function tryGrantOneTimeAccessExtensionAfterNewIntent(now: Date = new Date()): void {
  const state = getBillingState();
  if (!state) {
    return;
  }
  if (state.extendedUntil !== undefined) {
    return;
  }
  const extendedUntil = new Date(now.getTime() + INTENT_ACCESS_EXTENSION_DAYS * DAY_MS).toISOString();
  writeState({ ...state, extendedUntil });
}

export function isTrialActive(now: Date = new Date()): boolean {
  const state = getBillingState();
  if (!state) {
    return false;
  }
  const effectiveEndMs = getEffectiveAccessEndMsForState(state);
  return now.getTime() < effectiveEndMs;
}

export function getTrialDaysLeft(now: Date = new Date()): number {
  const state = getBillingState();
  if (!state) {
    return 0;
  }
  const effectiveEndMs = getEffectiveAccessEndMsForState(state);
  const leftMs = effectiveEndMs - now.getTime();
  if (leftMs <= 0) {
    return 0;
  }
  return Math.ceil(leftMs / DAY_MS);
}

export function subscribeBillingChanged(cb: () => void): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }
  const handler = () => {
    cb();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(BILLING_CHANGED_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(BILLING_CHANGED_EVENT, handler as EventListener);
  };
}

