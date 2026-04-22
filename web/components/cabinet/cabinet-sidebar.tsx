"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cabinetSidebarNav } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type CabinetSidebarProps = {
  className?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/cabinet") {
    return pathname === "/cabinet" || pathname === "/cabinet/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CabinetSidebar({ className }: CabinetSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 shrink-0 border-r border-white/8 bg-[#0a0a0a]/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex h-14 items-center border-b border-white/8 px-5">
        <Link
          href="/"
          className="text-xs font-medium tracking-[0.2em] text-zinc-400 transition hover:text-zinc-200"
        >
          ← на сайт
        </Link>
      </div>
      <nav className="space-y-1 p-3">
        {cabinetSidebarNav.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition",
                active
                  ? "border-white/20 bg-white/[0.08] text-white"
                  : "border-transparent text-zinc-500 hover:border-white/10 hover:bg-white/[0.04] hover:text-zinc-200",
              )}
            >
              <Icon
                className="shrink-0"
                size={18}
                strokeWidth={active ? 2.1 : 1.6}
                aria-hidden
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
