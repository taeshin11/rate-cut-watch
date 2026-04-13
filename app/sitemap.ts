import { MetadataRoute } from "next";
import fedData from "@/data/fed-data-fallback.json";
import indicatorsData from "@/data/indicators-fallback.json";

const BASE_URL = "https://rate-cut-watch.vercel.app";
const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  locales.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });
  });

  // Meetings pages
  locales.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/meetings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    fedData.meetings.forEach((meeting) => {
      entries.push({
        url: `${BASE_URL}/${locale}/meetings/${meeting.date}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // History pages
  locales.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/history`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Indicators pages
  locales.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/indicators`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });

    indicatorsData.indicators.forEach((ind) => {
      entries.push({
        url: `${BASE_URL}/${locale}/indicators/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
  });

  // Calculator pages
  locales.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}
