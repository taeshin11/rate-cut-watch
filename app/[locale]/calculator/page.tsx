import type { Metadata } from "next";
import Link from "next/link";
import CalculatorClient from "./CalculatorClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Rate Cut Impact Calculator — Mortgage & Savings",
    description: "Calculate how a Federal Reserve rate cut would affect your mortgage payment and savings account interest. See the dollar impact of a 0.25% or 0.50% rate cut.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/calculator`,
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
        {" / "}
        <span className="text-[#0c1a2e]">Calculator</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">
          Rate Change Impact Calculator
        </h1>
        <p className="text-gray-500">
          See how a Federal Reserve rate cut or hike would affect your mortgage payment and savings interest.
        </p>
      </div>

      <CalculatorClient />

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs text-gray-500">
          <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only.
          Actual mortgage rates depend on lender, credit score, loan type, and many other factors.
          Savings rate changes may lag Fed rate changes. This is not financial advice.
        </p>
      </div>
    </div>
  );
}
