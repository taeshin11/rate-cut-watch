import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-50 border-t border-blue-100 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm">
          <Link href="/en/about" className="text-gray-500 hover:text-[#2563eb] transition-colors">
            About
          </Link>
          <Link href="/en/how-to-use" className="text-gray-500 hover:text-[#2563eb] transition-colors">
            How to Use / FAQ
          </Link>
          <Link href="/en/privacy" className="text-gray-500 hover:text-[#2563eb] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/en/terms" className="text-gray-500 hover:text-[#2563eb] transition-colors">
            Terms of Use
          </Link>
        </nav>
        <p className="text-sm text-gray-500">
          {t("footer.copyright").replace("2025", String(year))} &middot;{" "}
          {t("footer.disclaimer")}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Data sourced from Federal Reserve (FRED), Bureau of Labor Statistics (BLS), and CME Group FedWatch Tool.
        </p>
        <div
          id="adsterra-social-bar"
          className="mt-4 min-h-[2px]"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
