import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Terms of Use — RateCutWatch",
    description:
      "Terms of use for RateCutWatch. This site provides informational content only and is not financial advice. Past Fed decisions do not predict future ones.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/terms`,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lastUpdated = "April 13, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">
          Home
        </Link>{" "}
        /{" "}
        <span className="text-[#0c1a2e]">Terms of Use</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {lastUpdated}</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using RateCutWatch at{" "}
            <span className="font-medium">rate-cut-watch.vercel.app</span> (the
            &ldquo;Site&rdquo;), you agree to be bound by these Terms of Use. If
            you do not agree, please do not use the Site.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            2. Informational Purpose Only
          </h2>
          <p className="mb-3">
            RateCutWatch is provided for{" "}
            <span className="font-semibold text-[#0c1a2e]">
              informational and educational purposes only
            </span>
            . All content on this Site — including federal funds rate data, FOMC
            meeting calendars, rate cut probability estimates, economic
            indicators, and any commentary — is intended solely to help users
            understand Federal Reserve monetary policy.
          </p>
          <p>
            <span className="font-semibold text-red-600">
              Nothing on this Site constitutes financial advice, investment
              advice, trading advice, or any other form of professional advice.
            </span>{" "}
            You should not make financial decisions based solely on information
            presented here.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            3. No Guarantee of Accuracy
          </h2>
          <p className="mb-3">
            While we strive to present accurate and timely data, we make no
            representations or warranties of any kind — express or implied —
            about the completeness, accuracy, reliability, suitability, or
            availability of the information on the Site. Data may be delayed,
            incomplete, or subject to errors.
          </p>
          <p>
            Rate cut probability figures shown on this Site are derived from
            CME FedWatch Tool data and reflect market-implied expectations from
            federal funds futures contracts. These are probabilistic estimates,
            not predictions.
          </p>
        </section>

        <section className="card border-l-4 border-amber-400">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            4. Past Decisions Do Not Predict Future Ones
          </h2>
          <p className="mb-3">
            Historical Federal Reserve rate decisions — including past rate
            cuts, hikes, and holds — do not guarantee, predict, or imply any
            particular future action by the FOMC. The Federal Reserve&apos;s
            policy decisions depend on evolving economic conditions, inflation
            data, labor market conditions, and the judgment of FOMC members at
            the time of each meeting.
          </p>
          <p>
            Charts, tables, and trend lines showing historical rate data on
            this Site are for context only and should not be extrapolated as
            forecasts of future monetary policy.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            5. Verify with Official Sources
          </h2>
          <p>
            Always verify interest rate information, FOMC decisions, and
            economic data with official Federal Reserve sources. The authoritative
            source for Federal Reserve policy decisions is the Federal Reserve
            website at{" "}
            <a
              href="https://www.federalreserve.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              federalreserve.gov
            </a>
            . For CME FedWatch probabilities, refer directly to{" "}
            <a
              href="https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              CME Group&apos;s FedWatch Tool
            </a>
            .
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, RateCutWatch and
            its operators shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising from
            your use of, or reliance on, the Site or its content. This includes
            but is not limited to financial losses resulting from investment
            decisions made in whole or in part based on information presented
            on this Site.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            7. Third-Party Links and Data
          </h2>
          <p>
            This Site may link to or reference third-party websites and data
            providers including the Federal Reserve, CME Group, the Bureau of
            Labor Statistics, and the Bureau of Economic Analysis. These links
            are provided for convenience. We have no control over the content
            of third-party sites and accept no responsibility for them.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            8. Intellectual Property
          </h2>
          <p>
            The design, layout, and original written content of RateCutWatch
            are the property of RateCutWatch and may not be reproduced without
            permission. Economic data sourced from government agencies (Federal
            Reserve, BLS, BEA) is in the public domain.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. The
            &ldquo;Last updated&rdquo; date at the top of this page reflects
            when changes were last made. Continued use of the Site after changes
            are posted constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            10. Governing Law
          </h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with applicable law. Any disputes arising from your use of the Site
            shall be subject to the exclusive jurisdiction of the appropriate
            courts.
          </p>
        </section>

        <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 text-sm text-gray-500">
          See also:{" "}
          <Link
            href={`/${locale}/privacy`}
            className="text-[#2563eb] hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          &middot;{" "}
          <Link
            href={`/${locale}/about`}
            className="text-[#2563eb] hover:underline"
          >
            About RateCutWatch
          </Link>
        </div>
      </div>
    </div>
  );
}
