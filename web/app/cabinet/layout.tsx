import type { Metadata } from "next";
import { CabinetEntry } from "@/components/cabinet/cabinet-entry";
import { CabinetProjectProvider } from "@/components/cabinet/cabinet-project-provider";

export const metadata: Metadata = {
  title: "Кабинет",
  description: "AI Site Engine — заявки, страницы и рост",
};

export default function CabinetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CabinetProjectProvider>
      <CabinetEntry>{children}</CabinetEntry>
    </CabinetProjectProvider>
  );
}
