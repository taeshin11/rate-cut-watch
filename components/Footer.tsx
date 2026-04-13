import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-50 border-t border-blue-100 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
