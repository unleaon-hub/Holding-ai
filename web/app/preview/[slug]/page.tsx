import type { Metadata } from "next";
import { PreviewPageClient } from "@/components/site-preview/preview-page-client";

// TODO: при backend — SSG/ISR по slug из API; сейчас весь рендер на клиенте (localStorage)
export const metadata: Metadata = {
  title: "Превью сайта",
};

export default function PreviewBySlugPage() {
  return <PreviewPageClient />;
}
