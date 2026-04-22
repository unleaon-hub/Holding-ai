import Link from "next/link";
import { cn } from "@/lib/utils";

export function CabinetEmptyState({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "min-h-dvh overflow-x-hidden bg-[#0d0d0d] text-zinc-100",
        className,
      )}
    >
      <div className="section-shell flex min-h-dvh flex-col items-center justify-center py-20">
        <div className="surface-card max-w-md p-8 text-center">
          <p className="eyebrow">кабинет</p>
          <h1 className="mt-2 text-2xl font-light text-white md:text-3xl">У вас пока нет проекта</h1>
          <p className="mt-3 text-sm text-zinc-500">
            Создайте сайт через запуск — он появится здесь и в превью.
          </p>
          <Link
            href="/start"
            className="cta-pulse mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/14"
          >
            Создать сайт
          </Link>
        </div>
      </div>
    </div>
  );
}
