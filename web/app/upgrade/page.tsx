import type { Metadata } from "next";
import { UpgradePageContent } from "@/components/upgrade/upgrade-page-content";

export const metadata: Metadata = {
  title: "Продление доступа",
};

export default function UpgradePage() {
  return <UpgradePageContent />;
}

