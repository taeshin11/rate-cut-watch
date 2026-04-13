import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MeetingCard from "@/components/MeetingCard";
import fedData from "@/data/fed-data-fallback.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "FOMC Meetings 2025",
    description: "All Federal Open Market Committee meeting dates for 2025 with rate cut probabilities and decisions.",
    alternates: {
      canonical: `https://rate-cut-watch.vercel.app/${locale}/meetings`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function MeetingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const pastMeetings = fedData.meetings.filter(
    (m) => new Date(m.date + "T12:00:00Z") <= new Date()
  );
  const upcomingMeetings = fedData.meetings.filter(
    (m) => new Date(m.date + "T12:00:00Z") > new Date()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0c1a2e] mb-2">FOMC Meetings 2025</h1>
        <p className="text-gray-500">
          Federal Open Market Committee meeting schedule with rate cut probabilities based on CME FedWatch data.
        </p>
      </div>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-4">Upcoming Meetings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.date} meeting={meeting} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[#0c1a2e] mb-4">Past Meetings</h2>
          <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Decision</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Rate</th>
                </tr>
              </thead>
              <tbody>
                {pastMeetings.map((meeting, i) => (
                  <tr
                    key={meeting.date}
                    className={`border-b border-blue-50 hover:bg-blue-50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-[#0c1a2e]">{formatDate(meeting.date)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          meeting.decision === "hold"
                            ? "bg-amber-100 text-amber-800"
                            : meeting.decision === "cut"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {meeting.decision === "hold" ? "Hold" : meeting.decision === "cut" ? "Cut" : "TBD"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#2563eb]">
                      {meeting.rate != null ? `${meeting.rate}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
