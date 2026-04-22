"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cabinetBottomNav } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type CabinetMobileNavProps = {
  className?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/cabinet") {
    return pathname === "/cabinet" || pathname === "/cabinet/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CabinetMobileNav({ className }: CabinetMobileNavProps) {
  const pathname = usePathname();
  const cols = cabinetBottomNav.length;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 bg-[#0d0d0d]/96 backdrop-blur-xl md:hidden",
        className,
      )}
      aria-label="Кабинет: нижняя навигация"
    >
      <div
        className={cn(
          "grid h-[4.5rem] gap-0 px-0.5",
          cols <= 1 && "mx-auto w-full max-w-sm grid-cols-1",
          cols === 2 && "grid-cols-2",
          cols === 3 && "grid-cols-3",
          cols === 4 && "grid-cols-4",
          cols === 5 && "grid-cols-5",
          cols >= 6 && "grid-cols-6",
        )}
        style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom, 0px))" }}
      >
        {cabinetBottomNav.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-0.5 text-[0.6rem] font-medium leading-tight transition sm:text-[0.65rem]",
                active ? "text-white" : "text-zinc-500",
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
      </div>
    </nav>
  );
}
