import type { Metadata } from "next";
import Link from "next/link";
import indicatorsData from "@/data/indicators-fallback.json";
import IndicatorCard from "@/components/IndicatorCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Economic Indicators — CPI, PCE, Unemployment, GDP",
    description: "Track key economic indicators including CPI, Core CPI, PCE, unemployment rate, and GDP growth that influence Federal Reserve rate decisions.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/indicators`,
    },
  };
}

export default async function IndicatorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
        {" / "}
        <span className="text-[#0c1a2e]">Indicators</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">Economic Indicators</h1>
        <p className="text-gray-500">
          Key macroeconomic indicators monitored by the Federal Reserve for rate decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicatorsData.indicators.map((ind) => (
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

      {/* Why these matter */}
      <div className="mt-12 bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-[#0c1a2e] mb-4">
          Why These Indicators Matter
        </h2>
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            The Federal Reserve uses a dual mandate: maximum employment and stable prices (2% inflation target).
            These indicators directly influence rate decisions.
          </p>
          <p>
            <strong className="text-[#0c1a2e]">CPI & PCE:</strong> When inflation is above 2%, the Fed raises
            rates to cool the economy. When inflation falls toward 2%, rate cuts become more likely.
          </p>
          <p>
            <strong className="text-[#0c1a2e]">Unemployment:</strong> High unemployment signals economic weakness,
            which may prompt rate cuts. Low unemployment with high inflation creates the classic "soft landing" challenge.
          </p>
          <p>
            <strong className="text-[#0c1a2e]">GDP:</strong> Strong GDP growth gives the Fed room to keep rates
            higher for longer. Weak GDP signals the need for stimulus via rate cuts.
          </p>
        </div>
      </div>
    </div>
  );
}
