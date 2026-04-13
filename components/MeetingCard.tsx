import Link from "next/link";

interface Meeting {
  date: string;
  decision: string;
  rate?: number | null;
  cutProbability?: number;
  holdProbability?: number;
}

export default function MeetingCard({ meeting, locale }: { meeting: Meeting; locale: string }) {
  const date = new Date(meeting.date + "T12:00:00Z");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const isPast = date < new Date();
  const cutProb = meeting.cutProbability ?? 0;

  const decisionColor =
    meeting.decision === "hold"
      ? "bg-amber-100 text-amber-800"
      : meeting.decision === "cut"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";

  return (
    <Link href={`/${locale}/meetings/${meeting.date}`}>
      <div className="bg-white rounded-xl border border-blue-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#0c1a2e]">{formattedDate}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${decisionColor}`}>
            {meeting.decision === "hold" ? "Hold" : meeting.decision === "cut" ? "Cut" : "TBD"}
          </span>
        </div>

        {meeting.rate !== null && meeting.rate !== undefined && (
          <p className="text-2xl font-bold text-[#2563eb] mb-1">{meeting.rate}%</p>
        )}

        {!isPast && cutProb > 0 && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Cut {Math.round(cutProb * 100)}%</span>
              <span>Hold {Math.round((1 - cutProb) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all"
                style={{ width: `${cutProb * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
