import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://homebirth.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/providers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/exploring`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/questions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
