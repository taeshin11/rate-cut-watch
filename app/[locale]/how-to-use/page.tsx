import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to Use RateCutWatch — Fed Rate FAQ",
    description:
      "Answers to common questions about the Federal funds rate, FOMC meetings, rate cuts, rate hikes, the yield curve, quantitative easing, and how Fed decisions affect mortgages, savings, and stocks.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/how-to-use`,
    },
  };
}

const faqs = [
  {
    q: "What is the Federal Funds Rate?",
    a: "The federal funds rate is the target interest rate set by the Federal Open Market Committee (FOMC) at which commercial banks borrow and lend their excess reserves to each other overnight. It is the primary monetary policy tool used by the Federal Reserve to influence economic activity, inflation, and employment. When the Fed raises this rate, borrowing across the economy becomes more expensive; when it cuts the rate, borrowing becomes cheaper.",
  },
  {
    q: "How does the Fed rate affect mortgages?",
    a: "The federal funds rate indirectly influences mortgage rates. Fixed-rate mortgages are more closely tied to 10-year Treasury yields, but adjustable-rate mortgages (ARMs) and home-equity lines of credit (HELOCs) often reset based on short-term benchmark rates like the Prime Rate, which moves in lockstep with the federal funds rate. When the Fed cuts rates, ARM payments typically fall; when it hikes, they rise. Even fixed-rate mortgage rates tend to drift lower when the market anticipates Fed cuts.",
  },
  {
    q: "What is an FOMC meeting?",
    a: "The Federal Open Market Committee (FOMC) is the policy-making body of the Federal Reserve that sets the target federal funds rate. It meets eight times per year (roughly every six to eight weeks) to review economic conditions and vote on interest rate policy. Each meeting concludes with a policy statement and, at alternating meetings, a press conference by the Fed Chair. The Summary of Economic Projections (SEP) — the \"dot plot\" — is released at four of the eight meetings per year.",
  },
  {
    q: "What is a rate cut vs a rate hike?",
    a: "A rate cut means the FOMC votes to lower the target federal funds rate. This eases monetary policy, making borrowing cheaper and stimulating economic activity. Rate cuts are typically implemented when the economy is slowing or inflation is below the Fed's 2% target. A rate hike means the FOMC votes to raise the target rate, tightening monetary policy to cool inflation or an overheating economy. Rate changes are usually made in increments of 25 basis points (0.25%), though larger moves of 50 or 75 basis points occur in periods of urgency.",
  },
  {
    q: "How does the Fed rate affect savings accounts?",
    a: "High-yield savings accounts, certificates of deposit (CDs), and money market funds offer returns that are closely tied to the federal funds rate. When the Fed raises rates, banks compete for deposits by offering higher annual percentage yields (APYs). When the Fed cuts rates, those yields fall — often quickly. The effect is more direct than with mortgages because short-term deposit rates shadow the overnight federal funds rate closely.",
  },
  {
    q: "What is the yield curve?",
    a: "The yield curve is a line that plots the interest rates (yields) of US Treasury bonds across different maturities — from 3-month bills to 30-year bonds. Normally the curve slopes upward: longer maturities carry higher yields because investors demand a premium for tying up money longer. An inverted yield curve — where short-term yields exceed long-term yields — has historically preceded recessions. The most watched spread is between the 10-year and 2-year Treasury yields. Fed rate hikes tend to push short-term yields up faster than long-term ones, often causing the curve to flatten or invert.",
  },
  {
    q: "What is quantitative easing?",
    a: "Quantitative easing (QE) is a non-traditional monetary policy tool the Federal Reserve uses when the federal funds rate is already near zero and additional stimulus is needed. The Fed creates new money to purchase large amounts of longer-term securities — typically US Treasury bonds and mortgage-backed securities (MBS) — from banks. This injects liquidity into the financial system, drives down longer-term interest rates, and encourages lending and investment. The reverse process — selling or allowing those securities to mature without reinvestment — is called quantitative tightening (QT).",
  },
  {
    q: "How does the Fed rate affect stocks?",
    a: "Interest rates affect stock valuations through multiple channels. Higher rates increase the discount rate used in discounted-cash-flow models, lowering the present value of future earnings — which tends to push stock prices down, especially for growth stocks with earnings far in the future. Higher rates also make bonds relatively more attractive compared to equities, potentially pulling money out of stocks. Conversely, rate cuts reduce the discount rate, boost present values, and make yield-seeking investors favor equities over low-yielding bonds. However, the relationship is not mechanical — the reason for a rate change matters too.",
  },
  {
    q: "How can I predict Fed rate decisions?",
    a: "No one can predict Fed decisions with certainty, but several tools help gauge probabilities. The CME FedWatch Tool derives implied probabilities from federal funds futures contracts traded on the CME exchange. Fed officials' public speeches, congressional testimony, and the FOMC meeting minutes also provide forward guidance. The Summary of Economic Projections (dot plot) shows where each FOMC member expects rates to be in coming years. On this site, we display the market-implied cut and hold probabilities for each upcoming meeting based on these futures prices.",
  },
  {
    q: "What is the neutral rate?",
    a: "The neutral rate (also called the natural rate or r-star) is the theoretical federal funds rate at which monetary policy is neither stimulating nor restraining economic growth, while keeping inflation at the 2% target. It is not directly observable and must be estimated. When the actual rate is above neutral, policy is restrictive; below neutral, it is accommodative. Fed officials publish their estimates of the longer-run neutral rate in the dot plot. Debates over where the neutral rate sits are central to every Fed policy discussion.",
  },
];

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-[#2563eb]">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-[#0c1a2e]">How to Use</span>
        </nav>

        <h1 className="text-3xl font-bold text-[#0c1a2e] mb-4">
          How to Use RateCutWatch
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          A guide to reading our dashboard and answers to frequently asked
          questions about Federal Reserve interest rate policy.
        </p>

        {/* Dashboard guide */}
        <section className="card mb-8">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-4">
            Reading the Dashboard
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>
              <span className="font-medium text-[#0c1a2e]">Rate Cut Probability gauge</span> —
              Shows the market-implied probability of a rate cut at the next
              FOMC meeting, derived from CME FedWatch data. A reading above 60%
              signals strong market consensus for a cut.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">Fed Funds Rate</span> —
              The current target range set by the FOMC. The lower bound is
              shown prominently; the full range appears below.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">FOMC Countdown</span> —
              Days until the next scheduled FOMC policy decision. Markets often
              shift positioning in the final days before a meeting.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">Economic Indicators</span> —
              Key data points the Fed watches: CPI, core PCE, unemployment, and
              others. Hover each card for trend direction.
            </li>
            <li>
              <span className="font-medium text-[#0c1a2e]">Rate History chart</span> —
              The trajectory of the federal funds rate since 2022, showing the
              full hiking cycle and subsequent cuts.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-[#0c1a2e] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="card group"
            >
              <summary className="cursor-pointer font-semibold text-[#0c1a2e] list-none flex justify-between items-center gap-4">
                <span>{faq.q}</span>
                <span className="text-[#2563eb] shrink-0 text-lg leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
