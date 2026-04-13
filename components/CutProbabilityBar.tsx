interface CutProbabilityBarProps {
  cutProbability: number;
  holdProbability?: number;
  showLabel?: boolean;
}

export default function CutProbabilityBar({
  cutProbability,
  holdProbability,
  showLabel = true,
}: CutProbabilityBarProps) {
  const cutPct = Math.round(cutProbability * 100);
  const holdPct = holdProbability
    ? Math.round(holdProbability * 100)
    : 100 - cutPct;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs font-medium mb-1">
          <span className="text-green-600">Cut: {cutPct}%</span>
          <span className="text-amber-600">Hold: {holdPct}%</span>
        </div>
      )}
      <div className="h-4 bg-amber-100 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-[#2563eb] transition-all duration-700 ease-in-out"
          style={{ width: `${cutPct}%` }}
          title={`Cut: ${cutPct}%`}
        />
      </div>
    </div>
  );
}
