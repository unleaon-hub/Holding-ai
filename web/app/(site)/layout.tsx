import { SiteHeader } from "@/components/site-header";
import { GlobalInputBar } from "@/components/global-input-bar";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="pb-[calc(6.75rem+env(safe-area-inset-bottom,0px))]">
        {children}
        <SiteFooter />
      </div>
      <GlobalInputBar />
    </>
  );
}
