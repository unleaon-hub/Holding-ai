"use client";

import Link from "next/link";
import { useCabinetProject } from "./cabinet-project-provider";
import { cn } from "@/lib/utils";

export function CabinetSiteReadyBlock({ className }: { className?: string }) {
  const { project } = useCabinetProject();
  if (!project) {
    return null;
  }

  return (
    <div className={cn("surface-card border border-white/10 p-5 md:p-6", className)}>
      <p className="eyebrow">Сайт</p>
      <h2 className="mt-2 text-xl font-light text-white md:text-2xl">Ваш сайт уже работает</h2>
      <p className="mt-2 text-sm text-zinc-500">
        Вы можете открыть его, доработать или начать принимать заявки
      </p>
      <p className="mt-1 text-xs text-zinc-600">
        {project.niche} · {project.city}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/preview/${project.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/14"
        >
          Открыть сайт
        </Link>
        <Link
          href="/cabinet/edit"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-sm text-zinc-200 transition hover:border-white/20 hover:text-white"
        >
          Редактировать
        </Link>
      </div>
    </div>
  );
}
