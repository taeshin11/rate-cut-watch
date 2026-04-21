import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

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
      default: "Fed Rate Cut Watch — FOMC Decisions & Rate History | RateCutWatch",
      template: "%s | RateCutWatch",
    },
    description: "Track Federal Reserve rate cut and hike decisions. View FOMC meeting calendar, fed funds rate history, and market expectations for future rate changes.",
    keywords: [
      "fed rate cut",
      "FOMC",
      "federal funds rate",
      "interest rate decision",
      "Fed rate hike",
      "rate cut probability",
      "Federal Reserve rates",
      "CME FedWatch",
    ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: "Fed Rate Cut Watch — FOMC Decisions & Rate History | RateCutWatch",
      description: "Track Federal Reserve rate cut and hike decisions. View FOMC meeting calendar, fed funds rate history, and market expectations for future rate changes.",
      type: "website",
      locale,
      siteName: "RateCutWatch",
      url: `${baseUrl}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Fed Rate Cut Watch — FOMC Decisions & Rate History | RateCutWatch",
      description: "Track Federal Reserve rate cut and hike decisions. View FOMC meeting calendar, fed funds rate history, and market expectations for future rate changes.",
    },
    other: {
      "google-adsense-account": "ca-pub-7098271335538021",
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
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="RateCutWatch" />
      <Footer />
    </NextIntlClientProvider>
  );
}
