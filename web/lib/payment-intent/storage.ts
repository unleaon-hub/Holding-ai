import { tryGrantOneTimeAccessExtensionAfterNewIntent } from "@/lib/billing";

const PAYMENT_INTENTS_STORAGE_KEY = "holding:payment_intents_v1";
const PAYMENT_INTENTS_CHANGED_EVENT = "holding-payment-intents";

export type PaymentIntent = {
  id: string;
  projectSlug: string;
  email: string;
  contact: string;
  status: "pending";
  createdAt: string;
};

type PaymentIntentsStateV1 = {
  version: 1;
  intents: PaymentIntent[];
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function newId(): string {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }
  return `intent-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readState(): PaymentIntentsStateV1 {
  if (!isBrowser()) {
    return { version: 1, intents: [] };
  }
  try {
    const raw = window.localStorage.getItem(PAYMENT_INTENTS_STORAGE_KEY);
    if (!raw) {
      return { version: 1, intents: [] };
    }
    const parsed = JSON.parse(raw) as Partial<PaymentIntentsStateV1>;
    if (parsed.version === 1 && Array.isArray(parsed.intents)) {
      return { version: 1, intents: parsed.intents as PaymentIntent[] };
    }
  } catch {
    // ignore broken payload
  }
  return { version: 1, intents: [] };
}

function writeState(next: PaymentIntentsStateV1): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(PAYMENT_INTENTS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota/private mode
  }
  window.dispatchEvent(new Event(PAYMENT_INTENTS_CHANGED_EVENT));
}

export function listPaymentIntents(): PaymentIntent[] {
  return [...readState().intents];
}

export function getPaymentIntent(projectSlug: string): PaymentIntent | null {
  const slug = projectSlug.trim();
  if (!slug) {
    return null;
  }
  const list = readState().intents.filter((intent) => intent.projectSlug === slug);
  if (list.length === 0) {
    return null;
  }
  return [...list].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0] ?? null;
}

export function createPaymentIntent(input: { projectSlug: string; email: string; contact: string }): PaymentIntent | null {
  const slug = input.projectSlug.trim();
  const email = input.email.trim();
  const contact = input.contact.trim();
  if (!slug || !email || !contact) {
    return null;
  }
  const existing = getPaymentIntent(slug);
  if (existing) {
    return existing;
  }
  const current = readState();
  const nextIntent: PaymentIntent = {
    id: newId(),
    projectSlug: slug,
    email,
    contact,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeState({
    version: 1,
    intents: [nextIntent, ...current.intents],
  });
  tryGrantOneTimeAccessExtensionAfterNewIntent();
  return nextIntent;
}

export function subscribePaymentIntentsChanged(cb: () => void): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }
  const handler = () => {
    cb();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(PAYMENT_INTENTS_CHANGED_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(PAYMENT_INTENTS_CHANGED_EVENT, handler as EventListener);
  };
}

