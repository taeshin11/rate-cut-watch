import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Privacy Policy — RateCutWatch",
    description:
      "Privacy policy for RateCutWatch. Learn how we handle data, cookies, and third-party services on our Federal Reserve rate tracking dashboard.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({
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
        <span className="text-[#0c1a2e]">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {lastUpdated}</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">1. Overview</h2>
          <p>
            RateCutWatch (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) operates the website at{" "}
            <span className="font-medium">rate-cut-watch.vercel.app</span>. This
            Privacy Policy explains how we collect, use, and protect information
            when you visit our site. By using RateCutWatch you agree to this
            policy.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            2. Information We Collect
          </h2>
          <p className="mb-3">
            <span className="font-medium text-[#0c1a2e]">
              Automatically collected data:
            </span>{" "}
            When you visit RateCutWatch, standard server logs and analytics
            tools may automatically record your IP address, browser type and
            version, operating system, referring URLs, pages visited, and the
            date and time of your visit. This information is used in aggregate
            to understand site usage and improve performance.
          </p>
          <p>
            <span className="font-medium text-[#0c1a2e]">
              No personal accounts:
            </span>{" "}
            RateCutWatch does not require registration or account creation. We
            do not collect names, email addresses, or any directly identifying
            personal information unless you contact us voluntarily.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            3. Cookies and Local Storage
          </h2>
          <p className="mb-3">
            We may use cookies or browser local storage for functional purposes
            such as remembering your preferred language locale. We do not use
            tracking cookies for targeted advertising on our own infrastructure.
          </p>
          <p>
            Third-party services embedded on this site (see section 4) may set
            their own cookies. You can disable cookies in your browser settings,
            though some site functionality may be affected.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            4. Third-Party Services
          </h2>
          <ul className="space-y-3">
            <li>
              <span className="font-medium text-[#0c1a2e]">Google AdSense</span> —
              We use Google AdSense to display advertisements. Google may use
              cookies to serve ads based on your visits to this and other
              websites. You can opt out of personalized advertising via{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline"
              >
                adssettings.google.com
              </a>
              .
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">Vercel Analytics</span> —
              Our hosting provider, Vercel, may collect anonymized performance
              and usage data to monitor site health.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">CME Group / FedWatch</span> —
              Rate probability data is sourced from publicly available CME
              FedWatch Tool data. No user data is transmitted to CME.
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            5. Data Retention
          </h2>
          <p>
            We do not maintain a personal data database. Any server log data
            retained by our hosting infrastructure is subject to Vercel&apos;s
            data retention policies. Aggregate analytics data may be retained
            indefinitely in anonymized form.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            6. Children&apos;s Privacy
          </h2>
          <p>
            RateCutWatch is not directed at children under 13. We do not
            knowingly collect personal information from children. If you believe
            a child has provided us with personal information, please contact us
            so we can delete it.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            7. Your Rights
          </h2>
          <p>
            Depending on your jurisdiction, you may have rights to access,
            correct, or request deletion of personal data we hold about you.
            Because we collect minimal personal data, most requests can be
            fulfilled by clearing your browser cookies and cache. For other
            requests, contact us at the email below.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top of this page reflects when the most
            recent changes were made. Continued use of the site after changes
            constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold text-[#0c1a2e] mb-3">9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out
            via the contact information listed on our{" "}
            <Link
              href={`/${locale}/about`}
              className="text-[#2563eb] hover:underline"
            >
              About page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
