import type { Metadata } from "next";
import Link from "next/link";
import fedData from "@/data/fed-data-fallback.json";
import RateChartWrapper from "../RateChartWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Fed Funds Rate History 2022–2025",
    description: "Historical Federal Reserve federal funds rate from 2022 to 2025, including all FOMC rate decisions.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/history`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Federal Funds Rate Historical Data",
    description: "Historical Federal Reserve federal funds rate from 2022 to 2025",
    creator: { "@type": "Organization", name: "Federal Reserve" },
    url: `https://rate-cut-watch.vercel.app/${locale}/history`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
          {" / "}
          <span className="text-[#0c1a2e]">Rate History</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">
            Fed Funds Rate History
          </h1>
          <p className="text-gray-500">
            Complete history of Federal Reserve rate decisions from 2022 to present.
          </p>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-4">Rate History (2022–2025)</h2>
          <RateChartWrapper data={fedData.rateHistory} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#2563eb]">
              {fedData.targetRangeLow}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Current Rate</p>
          </div>
          <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#0c1a2e]">
              {Math.max(...fedData.rateHistory.map((r) => r.rate)).toFixed(3)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Peak (2023)</p>
          </div>
          <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#0c1a2e]">
              {Math.min(...fedData.rateHistory.map((r) => r.rate)).toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Cycle Low (2022)</p>
          </div>
          <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#0c1a2e]">
              {fedData.rateHistory.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Rate Changes</p>
          </div>
        </div>

        {/* Rate change table */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-100">
            <h2 className="text-lg font-semibold text-[#0c1a2e]">All Rate Decisions</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50 border-b border-blue-100">
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Rate</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Change</th>
              </tr>
            </thead>
            <tbody>
              {[...fedData.rateHistory].reverse().map((item, i) => {
                const allRates = fedData.rateHistory;
                const currentIdx = allRates.findIndex((r) => r.date === item.date);
                const prevRate = currentIdx > 0 ? allRates[currentIdx - 1].rate : null;
                const change = prevRate !== null ? item.rate - prevRate : null;

                return (
                  <tr
                    key={item.date}
                    className={`border-b border-blue-50 hover:bg-blue-50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                    }`}
                  >
                    <td className="px-6 py-3 text-sm text-[#0c1a2e]">{formatDate(item.date)}</td>
                    <td className="px-6 py-3 text-sm font-semibold text-[#2563eb]">{item.rate}%</td>
                    <td className="px-6 py-3 text-sm">
                      {change !== null ? (
                        <span
                          className={`font-medium ${
                            change > 0
                              ? "text-red-500"
                              : change < 0
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {change > 0 ? "+" : ""}
                          {change.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
