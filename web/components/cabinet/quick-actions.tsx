import Link from "next/link";
import { quickActions } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type QuickActionsProps = {
  className?: string;
};

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <section className={className}>
      <p className="eyebrow">Быстрые действия</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              action.variant === "primary"
                ? "border-white/18 bg-white/8 text-white hover:bg-white/14"
                : "border-white/10 bg-transparent text-zinc-300 hover:border-white/16 hover:text-white",
            )}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
