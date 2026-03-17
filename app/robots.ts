import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/messages",
        "/preferences",
        "/provider-dashboard",
        "/provider-inbox",
        "/provider-profile",
        "/sign-in",
        "/provider-sign-in",
        "/provider-apply",
        "/auth/",
      ],
    },
    sitemap: "https://homebirth.com/sitemap.xml",
  };
}
