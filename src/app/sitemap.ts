import { MetadataRoute } from "next";
import { careers } from "@/data/careers";
import { seoPages } from "./[slug]/seo-data";

const BASE_URL = "https://careertype.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/stats`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/settings`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/achievements`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const careerPages: MetadataRoute.Sitemap = careers.map((c) => ({
    url: `${BASE_URL}/typing/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const seoPagesMap: MetadataRoute.Sitemap = seoPages.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...careerPages, ...seoPagesMap];
}
