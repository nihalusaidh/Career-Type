import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/stats", "/settings", "/achievements"],
    },
    sitemap: "https://careertype.app/sitemap.xml",
  };
}
