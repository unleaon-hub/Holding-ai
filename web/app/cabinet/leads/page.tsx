import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CabinetLeadsContent } from "@/components/cabinet/cabinet-leads-content";
import { buildLeadsHeadlineLine, leadStatusLabel, leadStatusOrder, leadsPageHeader } from "@/data/cabinet";

export const metadata: Metadata = { title: "Лиды" };

export default function CabinetLeadsPage() {
  const statusChain = leadStatusOrder.map((k) => leadStatusLabel[k]).join(" → ");
  const { line, apiRef } = buildLeadsHeadlineLine(statusChain);

  return (
    <main className="w-full max-w-6xl min-w-0">
      <Reveal>
        <p className="eyebrow">CRM</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">{leadsPageHeader.title}</h1>
        <p className="section-lead mt-2 text-sm text-zinc-500 md:text-base">
          {leadsPageHeader.subtitle}
        </p>
        <p className="mt-3 break-words text-xs text-zinc-600 md:text-sm">
          {line} <span className="text-zinc-600">{apiRef}</span>
        </p>
      </Reveal>

      <CabinetLeadsContent />
    </main>
  );
}
