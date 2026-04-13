import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import indicatorsData from "@/data/indicators-fallback.json";
import IndicatorChartWrapper from "./IndicatorChartWrapper";

export function generateStaticParams() {
  return indicatorsData.indicators.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const indicator = indicatorsData.indicators.find((i) => i.slug === slug);
  if (!indicator) return { title: "Indicator Not Found" };

  return {
    title: `${indicator.name} — Economic Indicator`,
    description: indicator.description,
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/indicators/${slug}`,
    },
  };
}

export default async function IndicatorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const indicator = indicatorsData.indicators.find((i) => i.slug === slug);

  if (!indicator) notFound();

  const delta = indicator.change ?? (indicator.current - indicator.previous);
  const isPositive = delta > 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: indicator.name,
    description: indicator.description,
    variableMeasured: indicator.name,
    url: `https://rate-cut-watch.vercel.app/${locale}/indicators/${slug}`,
    creator: { "@type": "Organization", name: "Bureau of Labor Statistics / Federal Reserve" },
    temporalCoverage: "2024/2025",
  };

  // Build chart data from history
  const chartData = indicator.history.map((h) => ({
    date: h.date,
    rate: h.value,
  }));

  const relatedSlugs = indicatorsData.indicators
    .filter((i) => i.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
          {" / "}
          <Link href={`/${locale}/indicators`} className="hover:text-[#2563eb]">Indicators</Link>
          {" / "}
          <span className="text-[#0c1a2e]">{indicator.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">{indicator.name}</h1>
          <p className="text-gray-500">{indicator.description}</p>
        </div>

        {/* Current value */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Current</p>
            <p className="text-4xl font-bold text-[#2563eb]">
              {indicator.current.toFixed(1)}
              <span className="text-xl text-gray-400 ml-1">{indicator.unit}</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Previous</p>
            <p className="text-4xl font-bold text-[#0c1a2e]">
              {indicator.previous.toFixed(1)}
              <span className="text-xl text-gray-400 ml-1">{indicator.unit}</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Change</p>
            <p
              className={`text-4xl font-bold ${
                isPositive ? "text-red-500" : delta < 0 ? "text-green-500" : "text-gray-500"
              }`}
            >
              {delta > 0 ? "+" : ""}
              {delta.toFixed(1)}
              <span className="text-xl ml-1">{indicator.unit}</span>
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-4">12-Month Trend</h2>
          <IndicatorChartWrapper data={chartData} label={indicator.name} />
          <p className="text-xs text-gray-400 mt-3">
            Last updated: {indicator.lastUpdate} · Source: BLS / Federal Reserve
          </p>
        </div>

        {/* Related Indicators */}
        <div>
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-4">Related Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedSlugs.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${locale}/indicators/${rel.slug}`}
                className="bg-white rounded-xl border border-blue-100 p-4 hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-semibold text-[#0c1a2e]">{rel.name}</p>
                <p className="text-xl font-bold text-[#2563eb] mt-1">
                  {rel.current.toFixed(1)}{rel.unit}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
