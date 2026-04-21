import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About RateCutWatch — Federal Reserve Rate Tracker",
    description:
      "RateCutWatch monitors Federal Reserve FOMC decisions, federal funds rate changes, and market expectations for future rate moves. Essential for mortgage borrowers, bond investors, and businesses.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">
          Home
        </Link>{" "}
        /{" "}
        <span className="text-[#0c1a2e]">About</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#0c1a2e] mb-4">
        About RateCutWatch
      </h1>
      <p className="text-gray-500 mb-8 text-lg">
        Your free, real-time dashboard for Federal Reserve interest rate
        decisions and market expectations.
      </p>

      <div className="space-y-8">
        <section className="card">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-3">
            What We Track
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            RateCutWatch monitors the Federal Open Market Committee (FOMC)
            meetings and decisions, the federal funds rate — the benchmark
            interest rate set by the Federal Reserve — and market-implied
            probabilities for future rate cuts or hikes as derived from CME
            FedWatch Tool data.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We also track key macroeconomic indicators that the Fed watches
            closely: the Consumer Price Index (CPI), Personal Consumption
            Expenditures (PCE) inflation, and the unemployment rate. Together
            these data points paint a clear picture of where monetary policy is
            headed.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-3">
            Why It Matters
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="font-semibold text-[#2563eb] shrink-0">Mortgage borrowers</span>
              <span>
                Adjustable-rate mortgages and home-equity lines of credit are
                directly linked to the federal funds rate. A rate cut can lower
                monthly payments; a hike can raise them.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[#2563eb] shrink-0">Bond investors</span>
              <span>
                Bond prices move inversely to interest rates. Understanding Fed
                policy direction helps investors manage duration risk and
                position for yield curve shifts.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[#2563eb] shrink-0">Businesses</span>
              <span>
                Companies planning capital expenditures, mergers, or debt
                refinancing need to anticipate borrowing costs. Fed rate
                expectations directly influence corporate finance decisions.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[#2563eb] shrink-0">Savers &amp; depositors</span>
              <span>
                High-yield savings accounts, CDs, and money market funds offer
                returns tied to the federal funds rate. Rate cuts reduce yields;
                hikes increase them.
              </span>
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-3">
            Our Data Sources
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <span className="font-medium text-[#0c1a2e]">Federal Reserve (FRED)</span> —
              Official FOMC statements, press releases, and federal funds rate
              target range announcements.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">CME FedWatch Tool</span> —
              Market-implied probabilities for rate changes at upcoming FOMC
              meetings, derived from federal funds futures contracts.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">Bureau of Labor Statistics (BLS)</span> —
              Consumer Price Index (CPI) data, including headline and core
              measures.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">Bureau of Economic Analysis (BEA)</span> —
              Personal Consumption Expenditures (PCE) data, the Fed&apos;s
              preferred inflation gauge.
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-3">
            Available in 8 Languages
          </h2>
          <p className="text-gray-600 leading-relaxed">
            RateCutWatch is available in English, Korean, Japanese, Chinese,
            Spanish, French, German, and Portuguese — making Federal Reserve
            data accessible to investors and businesses around the world.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-3">
            Disclaimer
          </h2>
          <p className="text-gray-600 leading-relaxed">
            RateCutWatch provides informational content only. Nothing on this
            site constitutes financial advice. Always verify data with official
            Federal Reserve sources at{" "}
            <a
              href="https://www.federalreserve.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              federalreserve.gov
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
