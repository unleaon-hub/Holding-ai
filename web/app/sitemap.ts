import type { MetadataRoute } from "next";
import { packageSlugs } from "@/lib/landing-packages";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootUrl = "https://holding-ai.example";
  const routes: MetadataRoute.Sitemap = [
    {
      url: rootUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  packageSlugs.forEach((slug) => {
    routes.push({
      url: `${rootUrl}/packages/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  return routes;
}
