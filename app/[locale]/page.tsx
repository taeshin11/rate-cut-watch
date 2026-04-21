import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import RateGauge from "@/components/RateGauge";
import MeetingCard from "@/components/MeetingCard";
import IndicatorCard from "@/components/IndicatorCard";
import RateChartWrapper from "./RateChartWrapper";
import fedData from "@/data/fed-data-fallback.json";
import indicatorsData from "@/data/indicators-fallback.json";

import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "RateCutWatch — Fed Rate Cut Probability | Current Rate 3.875%",
    description: "Fed funds rate 3.875% (3.75-4.00% target range). Track next FOMC cut probability, CPI 2.8%, PCE 2.6%, and 2026 meeting calendar. Free forever.",
  };
}

function getNextMeeting() {
  const now = new Date();
  return fedData.meetings.find((m) => new Date(m.date + "T12:00:00Z") > now) || null;
}

function getDaysUntil(dateStr: string) {
  const target = new Date(dateStr + "T12:00:00Z");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Schema.org structured data
function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RateCutWatch",
    url: "https://rate-cut-watch.vercel.app",
    description: "Federal Reserve rate cut probability dashboard with CPI, PCE, and FOMC meeting tracker",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rate-cut-watch.vercel.app/en/indicators/{search_term}",
      "query-input": "required name=search_term",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the current Fed funds rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The current Federal funds target rate is ${fedData.targetRangeLow}%–${fedData.targetRangeHigh}% as of ${formatDate(fedData.lastChange)}.`,
        },
      },
      {
        "@type": "Question",
        name: "When is the next FOMC meeting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The next Federal Open Market Committee meeting is scheduled for ${getNextMeeting() ? formatDate(getNextMeeting()!.date) : "TBD"}.`,
        },
      },
      {
        "@type": "Question",
        name: "What is the probability of a Fed rate cut?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The probability of a rate cut at the next FOMC meeting is approximately ${Math.round((getNextMeeting()?.cutProbability ?? 0) * 100)}%.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const nextMeeting = getNextMeeting();
  const daysUntil = nextMeeting ? getDaysUntil(nextMeeting.date) : null;
  const cutProb = nextMeeting?.cutProbability ?? 0;
  const topIndicators = indicatorsData.indicators.slice(0, 4);

  return (
    <>
      <WebsiteSchema />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0c1a2e] mb-3">
            Track Fed Rate Cuts
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Live probability, CPI trends, and FOMC meeting schedules — free forever.
          </p>

          {/* Key stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-blue-100 p-5 text-center shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Fed Funds Rate
              </p>
              <p className="text-3xl font-bold text-[#2563eb]">
                {fedData.targetRangeLow}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {fedData.targetRangeLow}%–{fedData.targetRangeHigh}% target
              </p>
            </div>

            <div className="bg-white rounded-xl border border-blue-100 p-5 text-center shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Last Change
              </p>
              <p className="text-2xl font-bold text-[#0c1a2e]">
                {fedData.lastChangeAmount > 0 ? "+" : ""}
                {fedData.lastChangeAmount}%
              </p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(fedData.lastChange)}</p>
            </div>

            <div className="bg-white rounded-xl border border-blue-100 p-5 text-center shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                CPI Inflation
              </p>
              <p className="text-3xl font-bold text-[#0c1a2e]">{fedData.cpi.current}%</p>
              <p className="text-xs text-gray-400 mt-1">
                Core: {fedData.cpi.core}%
              </p>
            </div>

            <div className="bg-white rounded-xl border border-blue-100 p-5 text-center shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Unemployment
              </p>
              <p className="text-3xl font-bold text-[#0c1a2e]">{fedData.unemployment}%</p>
              <p className="text-xs text-gray-400 mt-1">U-3 Rate</p>
            </div>
          </div>
        </section>

        {/* Main content: Gauge + Next Meeting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cut Probability Gauge */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0c1a2e] mb-4">
              Rate Cut Probability
            </h2>
            {nextMeeting ? (
              <>
                <RateGauge probability={cutProb} label="Cut Probability" />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Next meeting:{" "}
                    <span className="font-semibold text-[#0c1a2e]">
                      {formatDate(nextMeeting.date)}
                    </span>
                  </p>
                  {daysUntil !== null && (
                    <p className="text-xs text-gray-400 mt-1">
                      {daysUntil} days away
                    </p>
                  )}
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="flex-1 bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[#2563eb]">
                      {Math.round(cutProb * 100)}%
                    </p>
                    <p className="text-xs text-gray-500">Cut</p>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-amber-600">
                      {Math.round((1 - cutProb) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500">Hold</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400">No upcoming meetings found.</p>
            )}
          </div>

          {/* Countdown + PCE */}
          <div className="space-y-4">
            {/* Countdown */}
            {nextMeeting && daysUntil !== null && (
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#0c1a2e] mb-2">
                  Next FOMC Meeting
                </h2>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-[#2563eb]">{daysUntil}</div>
                  <div>
                    <p className="text-sm text-gray-500">days until meeting</p>
                    <p className="text-sm font-semibold text-[#0c1a2e]">
                      {formatDate(nextMeeting.date)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PCE */}
            <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0c1a2e] mb-4">
                Fed&#39;s Inflation Targets
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">PCE Inflation</span>
                  <span className="text-sm font-semibold text-[#0c1a2e]">
                    {fedData.pce.current}%
                    <span className="text-xs text-gray-400 ml-1">(target: 2%)</span>
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563eb] rounded-full"
                    style={{ width: `${Math.min((fedData.pce.current / 5) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Core PCE</span>
                  <span className="text-sm font-semibold text-[#0c1a2e]">
                    {fedData.pce.core}%
                    <span className="text-xs text-gray-400 ml-1">(target: 2%)</span>
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full"
                    style={{ width: `${Math.min((fedData.pce.core / 5) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Target: 2% · Last updated {fedData.cpi.lastUpdate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rate History Chart */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#0c1a2e]">
                Fed Funds Rate History (2022–2025)
              </h2>
              <a
                href={`/${locale}/history`}
                className="text-sm text-[#2563eb] hover:underline"
              >
                View full history →
              </a>
            </div>
            <RateChartWrapper data={fedData.rateHistory} />
          </div>
        </section>

        {/* Economic Indicators */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0c1a2e]">
              Economic Indicators
            </h2>
            <a
              href={`/${locale}/indicators`}
              className="text-sm text-[#2563eb] hover:underline"
            >
              View all →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topIndicators.map((ind) => (
              <IndicatorCard
                key={ind.slug}
                slug={ind.slug}
                name={ind.name}
                current={ind.current}
                previous={ind.previous}
                change={ind.change}
                unit={ind.unit}
                locale={locale}
                description={ind.description}
              />
            ))}
          </div>
        </section>

        {/* FOMC Meetings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0c1a2e]">
              FOMC Meetings 2025
            </h2>
            <a
              href={`/${locale}/meetings`}
              className="text-sm text-[#2563eb] hover:underline"
            >
              View all →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fedData.meetings.slice(0, 6).map((meeting) => (
              <MeetingCard key={meeting.date} meeting={meeting} locale={locale} />
            ))}
          </div>
        </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />
      </div>
    </>
  );
}
