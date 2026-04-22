import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SettingsForm } from "@/components/cabinet/settings-form";
import { cabinetPageIntros } from "@/data/cabinet";

export const metadata: Metadata = { title: "Настройки" };

export default function CabinetSettingsPage() {
  return (
    <main className="w-full max-w-3xl min-w-0">
      <Reveal>
        <p className="eyebrow">проект</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">Настройки</h1>
        <p className="section-lead mt-2 text-sm text-zinc-500 md:text-base">
          {cabinetPageIntros.settings}
        </p>
      </Reveal>
      <SettingsForm className="mt-8" />
    </main>
  );
}
