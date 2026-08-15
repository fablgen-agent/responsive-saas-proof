import type { MetadataRoute } from "next";

const canonicalUrl = "https://fablgen-agent.github.io/responsive-saas-proof/";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonicalUrl,
      lastModified: "2026-08-15",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
