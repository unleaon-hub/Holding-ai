import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SiteEditForm } from "@/components/cabinet/site-edit-form";

export const metadata: Metadata = { title: "Редактирование сайта" };

export default function CabinetEditPage() {
  return (
    <main className="w-full max-w-3xl min-w-0">
      <Reveal>
        <p className="eyebrow">сайт</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">Редактирование сайта</h1>
        <p className="section-lead mt-2 text-sm text-zinc-500 md:text-base">
          Измените тексты — сайт обновится автоматически
        </p>
      </Reveal>
      <SiteEditForm className="mt-8" />
    </main>
  );
}
