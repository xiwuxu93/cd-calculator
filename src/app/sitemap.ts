import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", changeFreq: "weekly" as const, priority: 1.0 },
    { path: "/early-withdrawal-penalty-calculator", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "/cd-ladder-calculator", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "/how-to-calculate-cd-interest", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "/6-month-cd-calculator", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "/1-year-cd-calculator", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "/privacy", changeFreq: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFreq: "yearly" as const, priority: 0.3 },
    { path: "/disclaimer", changeFreq: "yearly" as const, priority: 0.3 },
  ] as const;

  return locales.flatMap((locale) => {
    const localePrefix = locale === defaultLocale ? "" : `/${locale}`;

    return routes.map((route) => ({
      url: `${SITE_URL}${localePrefix}${route.path === "/" ? "" : route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority: route.path === "/" ? (locale === defaultLocale ? route.priority : 0.8) : route.priority,
    }));
  });
}
