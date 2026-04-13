"use client";

import dynamic from "next/dynamic";

const RateChart = dynamic(() => import("@/components/RateChart"), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] bg-blue-50 rounded-lg animate-pulse flex items-center justify-center text-gray-400 text-sm">
      Loading chart...
    </div>
  ),
});

interface DataPoint {
  date: string;
  rate: number;
}

export default function IndicatorChartWrapper({
  data,
  label,
}: {
  data: DataPoint[];
  label: string;
}) {
  return <RateChart data={data} />;
}
