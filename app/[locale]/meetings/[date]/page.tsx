import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fedData from "@/data/fed-data-fallback.json";
import CutProbabilityBar from "@/components/CutProbabilityBar";

type Meeting = {
  date: string;
  decision: string;
  rate?: number | null;
  cutProbability?: number;
  holdProbability?: number;
};

export function generateStaticParams() {
  return fedData.meetings.map((m) => ({ date: m.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}): Promise<Metadata> {
  const { locale, date } = await params;
  const meeting = fedData.meetings.find((m) => m.date === date);
  if (!meeting) return { title: "Meeting Not Found" };

  const formattedDate = new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return {
    title: `FOMC Meeting ${formattedDate}`,
    description: `Federal Open Market Committee meeting details for ${formattedDate}. Decision: ${meeting.decision}. Rate cut probability: ${Math.round((meeting.cutProbability ?? 0) * 100)}%.`,
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/meetings/${date}`,
    },
  };
}

function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
    ...opts,
  });
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}) {
  const { locale, date } = await params;
  const meetingIndex = fedData.meetings.findIndex((m) => m.date === date);

  if (meetingIndex === -1) notFound();

  const meeting: Meeting = fedData.meetings[meetingIndex];
  const prevMeeting = meetingIndex > 0 ? fedData.meetings[meetingIndex - 1] : null;
  const nextMeeting =
    meetingIndex < fedData.meetings.length - 1 ? fedData.meetings[meetingIndex + 1] : null;

  const isPast = new Date(date + "T12:00:00Z") < new Date();
  const cutProb = meeting.cutProbability ?? 0;
  const holdProb = meeting.holdProbability ?? 1 - cutProb;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `FOMC Meeting ${formatDate(date)}`,
    startDate: date,
    organizer: { "@type": "Organization", name: "Federal Reserve" },
    description: `Federal Open Market Committee meeting. Decision: ${meeting.decision}.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-[#2563eb]">Home</Link>
          {" / "}
          <Link href={`/${locale}/meetings`} className="hover:text-[#2563eb]">Meetings</Link>
          {" / "}
          <span className="text-[#0c1a2e]">{formatDate(date)}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#0c1a2e]">
                FOMC Meeting
              </h1>
              <p className="text-lg text-gray-500 mt-1">{formatDate(date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
            <span
              className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                meeting.decision === "hold"
                  ? "bg-amber-100 text-amber-800"
                  : meeting.decision === "cut"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {meeting.decision === "hold" ? "Hold" : meeting.decision === "cut" ? "Cut" : "TBD"}
            </span>
          </div>

          {meeting.rate != null && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Federal Funds Rate</p>
              <p className="text-4xl font-bold text-[#2563eb]">{meeting.rate}%</p>
            </div>
          )}

          {!isPast && cutProb > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-semibold text-[#0c1a2e] mb-3">
                Rate Cut Probability
              </h2>
              <CutProbabilityBar
                cutProbability={cutProb}
                holdProbability={holdProb}
              />
              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#2563eb]">{Math.round(cutProb * 100)}%</p>
                  <p className="text-sm text-gray-500 mt-1">Probability of Cut</p>
                </div>
                <div className="flex-1 bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">{Math.round(holdProb * 100)}%</p>
                  <p className="text-sm text-gray-500 mt-1">Probability of Hold</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Source: CME FedWatch Tool (static data, updated periodically)
              </p>
            </div>
          )}

          {isPast && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-700">
                This meeting has concluded.{" "}
                {meeting.decision === "hold"
                  ? "The Fed chose to hold rates unchanged."
                  : meeting.decision === "cut"
                  ? "The Fed cut rates at this meeting."
                  : "The outcome has been recorded."}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {prevMeeting && (
            <Link
              href={`/${locale}/meetings/${prevMeeting.date}`}
              className="flex-1 bg-white rounded-xl border border-blue-100 p-4 hover:shadow-md transition-shadow flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4 text-[#2563eb]" />
              <div>
                <p className="text-xs text-gray-400">Previous</p>
                <p className="text-sm font-semibold text-[#0c1a2e]">
                  {formatDate(prevMeeting.date)}
                </p>
              </div>
            </Link>
          )}
          {nextMeeting && (
            <Link
              href={`/${locale}/meetings/${nextMeeting.date}`}
              className="flex-1 bg-white rounded-xl border border-blue-100 p-4 hover:shadow-md transition-shadow flex items-center justify-end gap-2"
            >
              <div className="text-right">
                <p className="text-xs text-gray-400">Next</p>
                <p className="text-sm font-semibold text-[#0c1a2e]">
                  {formatDate(nextMeeting.date)}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#2563eb]" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
