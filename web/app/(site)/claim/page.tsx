import type { Metadata } from "next";
import { Suspense } from "react";
import { ClaimPageInner } from "@/components/site-preview/claim-page-inner";

export const metadata: Metadata = {
  title: "Сохранить сайт",
  description: "Сохраните проект и получите доступ к CRM и редактированию",
};

function ClaimFallback() {
  return (
    <main className="section-shell flex min-h-[50vh] items-center justify-center py-16">
      <p className="text-sm text-zinc-500">Загрузка…</p>
    </main>
  );
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<ClaimFallback />}>
      <ClaimPageInner />
    </Suspense>
  );
}
