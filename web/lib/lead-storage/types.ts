import type { LeadStatus } from "@/data/cabinet/types";

/** Секция лендинга, откуда отправлена заявка (только фиксированные значения). */
export type LeadFormSection = "hero" | "capture" | "final_cta";

export type CreateLeadInput = {
  name: string;
  phoneOrContact: string;
  message?: string;
  /** Стабильный источник для заявок с preview-сайта. */
  source: "Website";
  section: LeadFormSection;
};

export type StoredLead = {
  id: string;
  projectSlug: string;
  name: string;
  phoneOrContact: string;
  message?: string;
  source: CreateLeadInput["source"];
  section: LeadFormSection;
  createdAt: string;
  status: LeadStatus;
};

export type LeadsStateV1 = {
  version: 1;
  leads: StoredLead[];
};
