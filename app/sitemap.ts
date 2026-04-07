import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://homebirth.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/providers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/exploring`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/questions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic provider profile pages
  let providerPages: MetadataRoute.Sitemap = [];
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("providers")
      .select("id, updated_at")
      .order("name");

    if (data) {
      providerPages = data.map((p) => ({
        url: `${base}/provider/${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("[sitemap] Failed to fetch providers:", err);
  }

  return [...staticPages, ...providerPages];
}
