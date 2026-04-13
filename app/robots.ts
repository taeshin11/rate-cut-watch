import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://rate-cut-watch.vercel.app/sitemap.xml",
    host: "https://rate-cut-watch.vercel.app",
  };
}
