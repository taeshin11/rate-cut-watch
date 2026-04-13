"use client";

import { useEffect, useRef } from "react";

interface RateGaugeProps {
  probability: number; // 0 to 1
  label?: string;
}

export default function RateGauge({ probability, label = "Cut Probability" }: RateGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h * 0.75;
    const radius = Math.min(w, h) * 0.38;

    ctx.clearRect(0, 0, w, h);

    // Background arc (gray)
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI, 0);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineCap = "round";
    ctx.stroke();

    // Color based on probability
    const getColor = (p: number) => {
      if (p < 0.3) return "#22c55e"; // green - unlikely
      if (p < 0.6) return "#f59e0b"; // amber - possible
      return "#ef4444"; // red - likely
    };

    // Probability arc
    const angle = Math.PI + probability * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI, angle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = getColor(probability);
    ctx.lineCap = "round";
    ctx.stroke();

    // Needle
    const needleAngle = Math.PI + probability * Math.PI;
    const needleLen = radius - 10;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + needleLen * Math.cos(needleAngle),
      cy + needleLen * Math.sin(needleAngle)
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0c1a2e";
    ctx.lineCap = "round";
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#0c1a2e";
    ctx.fill();

    // Labels
    ctx.font = "bold 22px Inter, sans-serif";
    ctx.fillStyle = "#0c1a2e";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(probability * 100)}%`, cx, cy - 30);

    ctx.font = "13px Inter, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(label, cx, cy - 10);

    // Min/max labels
    ctx.font = "11px Inter, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "left";
    ctx.fillText("0%", cx - radius - 5, cy + 20);
    ctx.textAlign = "right";
    ctx.fillText("100%", cx + radius + 5, cy + 20);
  }, [probability, label]);

  return (
    <canvas
      ref={canvasRef}
      width={260}
      height={160}
      className="w-full max-w-[260px] mx-auto"
      aria-label={`${label}: ${Math.round(probability * 100)}%`}
    />
  );
}
