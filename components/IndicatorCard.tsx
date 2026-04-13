import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface IndicatorCardProps {
  slug: string;
  name: string;
  current: number;
  previous?: number;
  change?: number;
  unit: string;
  locale: string;
  description?: string;
}

export default function IndicatorCard({
  slug,
  name,
  current,
  previous,
  change,
  unit,
  locale,
  description,
}: IndicatorCardProps) {
  const delta = change ?? (previous !== undefined ? current - previous : 0);
  const isPositive = delta > 0;
  const isNegative = delta < 0;

  return (
    <Link href={`/${locale}/indicators/${slug}`}>
      <div className="bg-white rounded-xl border border-blue-100 p-5 hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-600 leading-tight">{name}</h3>
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              isPositive
                ? "bg-red-50 text-red-600"
                : isNegative
                ? "bg-green-50 text-green-600"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : isNegative ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            {delta !== 0 ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)}` : "—"}
          </span>
        </div>
        <p className="text-3xl font-bold text-[#0c1a2e]">
          {current.toFixed(1)}
          <span className="text-base font-normal text-gray-400 ml-1">{unit}</span>
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-2 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}
