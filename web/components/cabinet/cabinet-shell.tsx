import { CabinetHeader } from "@/components/cabinet/cabinet-header";
import { CabinetInlineNav } from "@/components/cabinet/cabinet-inline-nav";
import { CabinetMobileNav } from "@/components/cabinet/cabinet-mobile-nav";
import { CabinetSidebar } from "@/components/cabinet/cabinet-sidebar";
import { cn } from "@/lib/utils";

type CabinetShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function CabinetShell({ children, className }: CabinetShellProps) {
  return (
    <div
      className={cn("min-h-dvh overflow-x-hidden bg-[#0d0d0d] text-zinc-100", className)}
    >
      <div className="flex min-h-dvh">
        <CabinetSidebar className="hidden md:flex" />
        <div className="flex min-w-0 flex-1 flex-col">
          <CabinetHeader className="sticky top-0 z-30" />
          <div className="section-shell w-full min-w-0 flex-1 pt-4 pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))] md:pb-10">
            <CabinetInlineNav />
            {children}
          </div>
        </div>
      </div>
      <CabinetMobileNav />
    </div>
  );
}
