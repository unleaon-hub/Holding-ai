"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cabinetSidebarNav } from "@/data/cabinet";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/cabinet") {
    return pathname === "/cabinet" || pathname === "/cabinet/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Горизонтальные ссылки по разделам кабинета (только на узких экранах, без боковой панели).
 * Дополняет нижнюю навигацию: быстрый переход без прокрутки к низу экрана.
 */
export function CabinetInlineNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("md:hidden mb-5 border-b border-white/6 pb-3", className)}
      aria-label="Разделы кабинета"
    >
      <p className="eyebrow mb-2">Разделы</p>
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:thin]">
        {cabinetSidebarNav.map(({ href, label }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-white/20 bg-white/[0.1] text-white"
                  : "border-white/10 text-zinc-400 hover:border-white/16 hover:text-zinc-200",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
