"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";

const locales = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
  { code: "ja", label: "JA" },
  { code: "zh", label: "ZH" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "pt", label: "PT" },
];

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/meetings`, label: t("nav.meetings") },
    { href: `/${locale}/history`, label: t("nav.history") },
    { href: `/${locale}/indicators`, label: t("nav.indicators") },
    { href: `/${locale}/calculator`, label: t("nav.calculator") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-[#2563eb]">
          <TrendingDown className="w-6 h-6" />
          RateCutWatch
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#0c1a2e] hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="px-3 py-1.5 text-sm border border-blue-200 rounded-lg text-[#0c1a2e] hover:bg-blue-50 transition-colors"
            >
              {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white border border-blue-100 rounded-lg shadow-lg py-1 z-50 min-w-[80px]">
                {locales.map((l) => (
                  <Link
                    key={l.code}
                    href={getLocalePath(l.code)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                      l.code === locale ? "text-[#2563eb] font-semibold" : "text-[#0c1a2e]"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-[#0c1a2e] hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
