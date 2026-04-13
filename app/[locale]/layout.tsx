import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeNames: Record<string, string> = {
    en: "English", ko: "Korean", ja: "Japanese", zh: "Chinese",
    es: "Spanish", fr: "French", de: "German", pt: "Portuguese",
  };

  const baseUrl = "https://rate-cut-watch.vercel.app";
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}`;
  });

  return {
    title: {
      default: "RateCutWatch — Fed Rate Cut Probability Dashboard",
      template: "%s | RateCutWatch",
    },
    description: `Track Federal Reserve rate cut probabilities, CPI trends, and FOMC meeting schedules in real time. ${localeNames[locale] || ""} version.`,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: "RateCutWatch — Fed Rate Cut Probability Dashboard",
      description: "Live Fed rate cut probability, CPI trends, and FOMC meeting tracker.",
      type: "website",
      locale,
      siteName: "RateCutWatch",
    },
    twitter: {
      card: "summary_large_image",
      title: "RateCutWatch",
      description: "Live Fed rate cut probability dashboard.",
    },
    other: {
      "google-site-verification": "",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
