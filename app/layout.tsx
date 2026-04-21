import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: "RateCutWatch — Fed Rate Cut Probability Dashboard",
  description: "Track Federal Reserve rate cut probabilities, CPI trends, and FOMC meeting schedules in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#eff6ff] text-[#0c1a2e]">{children}</body>
    </html>
  );
}
