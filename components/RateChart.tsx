"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RatePoint {
  date: string;
  rate: number;
}

export default function RateChart({ data }: { data: RatePoint[] }) {
  const labels = data.map((d) => {
    const date = new Date(d.date + "T12:00:00Z");
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  });

  const rates = data.map((d) => d.rate);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Fed Funds Rate (%)",
        data: rates,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => `${ctx.parsed.y.toFixed(3)}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 6,
        ticks: {
          callback: (value: string | number) => `${value}%`,
          color: "#6b7280",
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { color: "#6b7280", maxTicksLimit: 10 },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="relative h-[280px] w-full">
      <Line data={chartData} options={options as Parameters<typeof Line>[0]["options"]} />
    </div>
  );
}
