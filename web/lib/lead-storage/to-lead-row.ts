import type { LeadRow } from "@/data/cabinet";
import { formatLeadTimeLabel } from "./format-time";
import type { StoredLead } from "./types";

const sectionPath: Record<StoredLead["section"], string> = {
  hero: "/preview#hero",
  capture: "/preview#capture",
  final_cta: "/preview#final_cta",
};

export function storedLeadToRow(lead: StoredLead): LeadRow {
  return {
    id: lead.id,
    name: lead.name.trim() || "—",
    phone: lead.phoneOrContact.trim(),
    source: lead.source,
    page: sectionPath[lead.section] ?? "/preview",
    timeLabel: formatLeadTimeLabel(lead.createdAt),
    status: lead.status,
  };
}

export function storedLeadsToRows(leads: readonly StoredLead[]): LeadRow[] {
  return leads.map(storedLeadToRow);
}
