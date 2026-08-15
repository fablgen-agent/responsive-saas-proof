import type { MetadataRoute } from "next";

const canonicalUrl = "https://fablgen-agent.github.io/responsive-saas-proof/";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/responsive-saas-proof/",
    },
    sitemap: `${canonicalUrl}sitemap.xml`,
  };
}
