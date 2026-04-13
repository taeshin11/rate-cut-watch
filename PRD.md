# RateCutWatch — PRD
## Interest Rates, CPI & Fed Watch Dashboard

---

## 1. Overview

**RateCutWatch** is a public macro-economic dashboard that surfaces Fed rate cut probabilities, CPI trends, and upcoming macro events in a clean, data-driven UI. Target audience includes retail investors, economists, financial journalists, and anyone tracking Federal Reserve policy decisions.

The site is fully static/ISR, SEO-first, mobile-first, free to operate, and monetized via Adsterra ads. All data is sourced from free public APIs (FRED, BLS, CME FedWatch).

---

## 2. Target Users

- Retail investors monitoring rate decisions
- Finance students and researchers
- Financial journalists and bloggers
- Macro traders seeking free FedWatch alternative
- General public curious about inflation/rates

---

## 3. Core Features

1. **Fed Rate Probability Gauge** — CME FedWatch-style probability chart for next FOMC meeting
2. **CPI Trend Charts** — Monthly CPI, Core CPI, YoY % change via BLS API
3. **FRED Data Widgets** — Fed Funds Rate, 10Y Treasury, 2Y Treasury, Unemployment, PCE
4. **Macro Event Calendar** — FOMC meeting dates, CPI release dates, PPI, NFP
5. **Indicator Detail Pages** — Each economic indicator gets its own SEO-optimized page
6. **Historical Data Browser** — Year-by-year rate and CPI history
7. **Compare Tool** — Side-by-side chart of any two indicators
8. **Visitor Counter** — Today + total visits shown in footer
9. **i18n** — 8 languages (en, ko, ja, zh, es, fr, de, pt)
10. **Adsterra Ads** — Social Bar + Native Banner + Display Banner placeholders
11. **Google Sheets Webhook** — Log user interactions (page views, compare tool usage)

---

## 4. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | ISR support, SEO metadata API |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| Charts | Chart.js + react-chartjs-2 | Free, lightweight |
| i18n | next-intl | App Router compatible |
| Data fetch | FRED API, BLS API, static JSON | Free tiers |
| Deploy | Vercel (free tier) | Zero-cost hosting |
| Backend (if needed) | Railway free tier | Cron revalidation |
| Ads | Adsterra | Monetization |
| Analytics hook | Google Apps Script webhook | User interaction logging |

---

## 5. Data Sources

### 5.1 FRED API (Federal Reserve Bank of St. Louis)
- **Base URL**: `https://api.stlouisfed.org/fred/series/observations`
- **Key**: Free, register at fred.stlouisfed.org (store in `FRED_API_KEY` env var)
- **Series used**:
  - `FEDFUNDS` — Effective Federal Funds Rate
  - `DGS10` — 10-Year Treasury Constant Maturity
  - `DGS2` — 2-Year Treasury Constant Maturity
  - `UNRATE` — Unemployment Rate
  - `PCEPILFE` — PCE Price Index (Core)
  - `T10Y2Y` — 10Y-2Y Spread (yield curve)
- **Rate limit**: None for reasonable use; cache responses 24h

### 5.2 BLS Public API (Bureau of Labor Statistics)
- **Base URL**: `https://api.bls.gov/publicAPI/v2/timeseries/data/`
- **Key**: Free registration at bls.gov (store in `BLS_API_KEY` env var)
- **Series used**:
  - `CUUR0000SA0` — CPI-U All Items
  - `CUUR0000SA0L1E` — Core CPI (ex food & energy)
- **Rate limit**: 25 queries/day unregistered; 500/day registered

### 5.3 CME FedWatch (Static Scrape / Manual JSON)
- CME Group publishes meeting probabilities; scrape or maintain a static JSON file updated weekly via a cron job or manual curator
- Store in `public/data/fedwatch.json` — object keyed by meeting date
- Format: `{ "2025-06-18": { "hold": 0.72, "cut25": 0.25, "cut50": 0.03 } }`

### 5.4 Macro Event Calendar (Static JSON)
- Maintain `public/data/events.json` with FOMC, CPI, PPI, NFP release dates for the calendar year
- Source from Federal Reserve website and BLS press release schedule

---

## 6. Page Structure

### 6.1 `/` — Homepage
- Hero: "Track Fed Rate Cuts in Real Time" with current fed funds rate prominent
- Fed Rate Probability card (gauge or horizontal bar chart)
- CPI YoY vs Core CPI YoY — dual-line chart, last 24 months
- Yield curve snapshot (2Y vs 10Y spread)
- Upcoming macro events (next 3)
- Top 4 FRED indicators in card grid
- Adsterra Social Bar (bottom fixed)
- Adsterra Native Banner (below hero)
- Visitor counter in footer

### 6.2 `/indicators/[slug]` — Indicator Detail
- Slug maps to FRED series ID (e.g., `/indicators/fedfunds`)
- Full historical chart (all available data)
- Description of indicator, why it matters
- Latest value, prior value, change
- Related indicators panel
- Adsterra Display Banner (sidebar or inline)
- Schema.org: `Dataset` structured data
- `hreflang` for all 8 languages

### 6.3 `/events/[date]` — Macro Event Detail
- Date format: `YYYY-MM-DD`
- Event name, type (FOMC/CPI/PPI/NFP), expected release time
- Historical outcomes for same event over past 5 years
- Market reaction note (manually curated text)
- Next/prev event navigation

### 6.4 `/history/[year]` — Historical Year View
- Fed funds rate average for the year
- CPI average for the year
- All FOMC decisions for that year
- Key macro headlines (static curated text)
- Chart: rate + CPI overlay for 12 months

### 6.5 `/compare` — Indicator Comparison Tool
- Dropdown A + Dropdown B (any two FRED series)
- Date range picker (1Y, 3Y, 5Y, 10Y, All)
- Dual-axis Chart.js line chart
- Correlation coefficient display
- Share URL (params in query string)
- Google Sheets webhook fires on each comparison

### 6.6 `/sitemap.xml` — Auto-generated
- All indicator slugs
- All event dates for current year
- All history years (2000–present)
- All i18n variants with hreflang

### 6.7 `/robots.txt`
- Allow all crawlers
- Point to sitemap

---

## 7. UI/UX Design

### 7.1 Color Palette (Soft Pastels)
```
Background:  #F0F4FF  (soft lavender-white)
Card:        #FFFFFF  with shadow-sm
Accent:      #6C8EBF  (muted blue)
Positive:    #6BAF8D  (soft green)
Negative:    #D4716A  (soft red/rose)
Neutral:     #A8B4C8  (slate)
Text:        #2D3748  (near-black)
Footer BG:   #E8EDF5
```

### 7.2 Typography
- Font: `Inter` (Google Fonts, self-hosted via next/font)
- Headings: `font-semibold`, sizes 2xl–4xl
- Body: `text-sm` or `text-base`, `text-gray-700`

### 7.3 Component Library (custom Tailwind)
- `<StatCard>` — value, label, delta badge, sparkline
- `<ChartWrapper>` — responsive Chart.js container with loading skeleton
- `<EventBadge>` — color-coded by event type
- `<ProbabilityBar>` — horizontal segmented bar for rate cut odds
- `<LanguageSwitcher>` — dropdown in nav
- `<AdPlaceholder>` — clearly marked div for Adsterra

### 7.4 Mobile-First Breakpoints
- Default (mobile): single column, stacked cards
- `md:` (768px): 2-column grid
- `lg:` (1024px): 3-column grid, sidebar ads

### 7.5 Navigation
- Top nav: Logo | Indicators | Events | History | Compare | [Lang]
- Mobile: hamburger menu with slide-out drawer
- Sticky header with blur backdrop

---

## 8. SEO Requirements

### 8.1 Metadata (per page)
```typescript
export const metadata: Metadata = {
  title: `${indicator.name} — RateCutWatch`,
  description: `Track ${indicator.name} historical data and trends. Updated daily from FRED.`,
  openGraph: { ... },
  twitter: { card: 'summary_large_image' },
  alternates: {
    canonical: `https://ratecutwatch.com/indicators/${slug}`,
    languages: {
      'en': '/en/indicators/...',
      'ko': '/ko/indicators/...',
      // ...
    }
  }
}
```

### 8.2 Schema.org Structured Data
- Homepage: `WebSite` + `SearchAction`
- Indicator pages: `Dataset` with `variableMeasured`
- Event pages: `Event` schema
- All pages: `BreadcrumbList`

### 8.3 Sitemap
- Generated via `next-sitemap` package
- Includes all dynamic routes
- `lastmod`, `changefreq`, `priority` per route type
- Separate `sitemap-indicators.xml`, `sitemap-events.xml`, `sitemap-history.xml`

### 8.4 hreflang
- Implemented via `alternates.languages` in Next.js metadata
- `x-default` points to English (`/en/`)
- All 8 language variants declared on every page

### 8.5 Core Web Vitals
- ISR with 24h revalidation for data pages
- `next/image` for all images with explicit width/height
- No layout shift: skeleton loaders match final content dimensions
- Preconnect to FRED API, Google Fonts

---

## 9. i18n

### 9.1 Supported Locales
`en`, `ko`, `ja`, `zh`, `es`, `fr`, `de`, `pt`

### 9.2 Implementation
- Library: `next-intl` with App Router
- Message files: `messages/[locale].json`
- URL structure: `/{locale}/path` (default locale `en` also prefixed for consistency)
- `next-intl` middleware in `middleware.ts`

### 9.3 Translation Keys (sample)
```json
{
  "nav.indicators": "Indicators",
  "nav.events": "Events",
  "nav.history": "History",
  "nav.compare": "Compare",
  "hero.title": "Track Fed Rate Cuts in Real Time",
  "hero.subtitle": "Live probability, CPI trends, and macro events — free forever.",
  "footer.visitors_today": "Visitors today: {count}",
  "footer.visitors_total": "Total visitors: {count}",
  "compare.select_a": "Select Indicator A",
  "compare.select_b": "Select Indicator B"
}
```

---

## 10. Ads (Adsterra)

### 10.1 Ad Units
Place the following placeholder divs in layout. Replace content with Adsterra embed code after account approval.

```html
<!-- Social Bar (fixed bottom, mobile-friendly) -->
<div id="adsterra-social-bar" class="fixed bottom-0 left-0 right-0 z-50">
  <!-- Adsterra Social Bar Code Here -->
</div>

<!-- Native Banner (below hero section) -->
<div id="adsterra-native-banner" class="w-full my-6 min-h-[90px] bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
  <!-- Adsterra Native Banner Code Here -->
</div>

<!-- Display Banner (sidebar or inline, 300x250) -->
<div id="adsterra-display-banner" class="w-[300px] h-[250px] bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm mx-auto my-4">
  <!-- Adsterra Display Banner Code Here -->
</div>
```

### 10.2 Ad Placement Rules
- No ads above the fold on mobile (preserve UX)
- Native banner: below hero, above main content
- Display banner: right sidebar on desktop; inline below first chart on mobile
- Social bar: fixed bottom, dismiss button available

---

## 11. Google Sheets Webhook

### 11.1 Setup
1. Create Google Sheet: `RateCutWatch-Events`
2. Columns: `timestamp`, `event_type`, `page`, `locale`, `detail`, `user_agent`
3. Deploy Google Apps Script as Web App (anyone can POST)
4. Store webhook URL in `NEXT_PUBLIC_WEBHOOK_URL` env var

### 11.2 Events to Log
- Page view on `/compare` with selected indicators
- Indicator page viewed (slug)
- Event page viewed (date)
- Language switched

### 11.3 Client-Side Fetch
```typescript
async function logEvent(eventType: string, detail: Record<string, string>) {
  if (!process.env.NEXT_PUBLIC_WEBHOOK_URL) return;
  await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      event_type: eventType,
      page: window.location.pathname,
      locale: navigator.language,
      ...detail,
      user_agent: navigator.userAgent.slice(0, 100)
    })
  });
}
```

### 11.4 Apps Script (deploy in Google Sheets)
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp, data.event_type, data.page,
    data.locale, data.detail || '', data.user_agent || ''
  ]);
  return ContentService.createTextOutput('ok');
}
```

---

## 12. Visitor Counter

### 12.1 Implementation (Vercel KV or static fallback)
- Primary: Vercel KV (free tier, 30MB) — increment on each page view via Edge middleware
- Fallback: JSON file in `public/` updated by cron (if KV unavailable)
- Keys: `visitors:total`, `visitors:YYYY-MM-DD`

### 12.2 Display (Footer)
```tsx
<footer className="bg-[#E8EDF5] py-4 text-center text-sm text-gray-500">
  <p>Visitors today: {visitorsToday.toLocaleString()} · Total: {visitorsTotal.toLocaleString()}</p>
  <p className="mt-1">© {year} RateCutWatch · Data: FRED, BLS · Not financial advice</p>
</footer>
```

---

## 13. Milestones & Git Strategy

### Milestone 0 — Repo Init
```bash
cd C:\MakingApps\260413\rate-cut-watch
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*"
gh repo create taeshin11/rate-cut-watch --public --source=. --push
```

### Milestone 1 — Project Scaffold & Config
- Install deps: `next-intl`, `chart.js`, `react-chartjs-2`, `next-sitemap`, `@vercel/kv`
- Set up Tailwind config with custom colors
- Create folder structure (see Section 15)
- Create `feature_list.json`, `claude-progress.txt`, `init.sh`
- Create `messages/` folder with all 8 locale JSON stubs
- Create `.env.local` with placeholder keys
- Commit: "scaffold: project init, tailwind config, i18n stubs"
- Push: `git push`

### Milestone 2 — Data Layer
- FRED API client: `src/lib/fred.ts`
- BLS API client: `src/lib/bls.ts`
- Static data files: `public/data/fedwatch.json`, `public/data/events.json`
- `src/lib/indicators.ts` — indicator metadata (name, description, unit, series ID)
- Cache strategy: `revalidate: 86400` on all fetch calls
- Commit + push

### Milestone 3 — Homepage
- Layout: `src/app/[locale]/layout.tsx`
- Homepage: `src/app/[locale]/page.tsx`
- Components: `StatCard`, `ProbabilityBar`, `ChartWrapper`, `AdPlaceholder`
- Visitor counter integrated in footer
- Adsterra placeholders in place
- Commit + push

### Milestone 4 — Indicator Pages
- `src/app/[locale]/indicators/[slug]/page.tsx`
- `generateStaticParams` for all indicator slugs
- Full historical chart, stat cards, related indicators
- Schema.org Dataset structured data
- Commit + push

### Milestone 5 — Events & History Pages
- `src/app/[locale]/events/[date]/page.tsx`
- `src/app/[locale]/history/[year]/page.tsx`
- Event calendar widget on homepage
- Commit + push

### Milestone 6 — Compare Tool
- `src/app/[locale]/compare/page.tsx`
- Dual dropdown + date range picker
- Dual-axis Chart.js
- Google Sheets webhook on comparison
- Shareable URL via query params
- Commit + push

### Milestone 7 — SEO, Sitemap, hreflang
- `next-sitemap.config.js` with all routes
- `robots.txt`
- All metadata filled
- Schema.org on all pages
- hreflang via `alternates`
- Commit + push

### Milestone 8 — i18n Polish
- Fill all 8 locale message files
- Language switcher in nav
- RTL check (not needed for these locales but verify)
- Commit + push

### Milestone 9 — Deploy
```bash
npx vercel --prod
```
- Set env vars in Vercel dashboard
- Verify ISR revalidation working
- Commit + push: "deploy: production Vercel"

---

## 14. File Structure

```
rate-cut-watch/
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── research_history/
│   ├── milestone-1.md
│   ├── milestone-2.md
│   └── ...
├── public/
│   ├── data/
│   │   ├── fedwatch.json
│   │   ├── events.json
│   │   └── indicators-meta.json
│   ├── robots.txt
│   └── sitemap.xml (generated)
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── indicators/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── events/
│   │   │   │   └── [date]/
│   │   │   │       └── page.tsx
│   │   │   ├── history/
│   │   │   │   └── [year]/
│   │   │   │       └── page.tsx
│   │   │   └── compare/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── visitors/
│   │   │       └── route.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── StatCard.tsx
│   │   ├── ChartWrapper.tsx
│   │   ├── ProbabilityBar.tsx
│   │   ├── EventBadge.tsx
│   │   ├── AdPlaceholder.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── fred.ts
│   │   ├── bls.ts
│   │   ├── indicators.ts
│   │   ├── webhook.ts
│   │   └── visitors.ts
│   └── middleware.ts
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
└── package.json
```

---

## 15. Harness Spec

### 15.1 `feature_list.json`
```json
{
  "project": "rate-cut-watch",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "FRED data integration", "status": "pending" },
    { "id": "F02", "name": "BLS CPI integration", "status": "pending" },
    { "id": "F03", "name": "CME FedWatch static data", "status": "pending" },
    { "id": "F04", "name": "Homepage dashboard", "status": "pending" },
    { "id": "F05", "name": "Indicator detail pages", "status": "pending" },
    { "id": "F06", "name": "Events calendar pages", "status": "pending" },
    { "id": "F07", "name": "History year pages", "status": "pending" },
    { "id": "F08", "name": "Compare tool", "status": "pending" },
    { "id": "F09", "name": "i18n (8 locales)", "status": "pending" },
    { "id": "F10", "name": "Adsterra ad placeholders", "status": "pending" },
    { "id": "F11", "name": "Google Sheets webhook", "status": "pending" },
    { "id": "F12", "name": "Visitor counter (KV)", "status": "pending" },
    { "id": "F13", "name": "SEO metadata + sitemap", "status": "pending" },
    { "id": "F14", "name": "Schema.org structured data", "status": "pending" },
    { "id": "F15", "name": "Vercel deployment", "status": "pending" }
  ]
}
```

### 15.2 `claude-progress.txt`
```
# RateCutWatch — Claude Build Progress
Started: [DATE]
Current milestone: 0
Last action: PRD written
Next action: Run init.sh to scaffold project

[MILESTONE LOG]
```

### 15.3 `init.sh`
```bash
#!/bin/bash
set -e
echo "=== RateCutWatch Init ==="

# Create Next.js project
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --yes

# Install dependencies
npm install next-intl chart.js react-chartjs-2 next-sitemap @vercel/kv

# Create folders
mkdir -p messages research_history public/data src/components src/lib

# Create placeholder env
cat > .env.local << 'EOF'
FRED_API_KEY=your_fred_api_key_here
BLS_API_KEY=your_bls_api_key_here
NEXT_PUBLIC_WEBHOOK_URL=your_google_apps_script_url_here
KV_REST_API_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here
EOF

# Init git and push
git init
git add .
git commit -m "scaffold: initial project setup"
gh repo create taeshin11/rate-cut-watch --public --source=. --push

echo "=== Init complete. Edit .env.local with real keys. ==="
```

---

## 16. Environment Variables

| Variable | Source | Notes |
|---|---|---|
| `FRED_API_KEY` | fred.stlouisfed.org | Free registration |
| `BLS_API_KEY` | bls.gov | Free registration |
| `NEXT_PUBLIC_WEBHOOK_URL` | Google Apps Script | Deploy as Web App |
| `KV_REST_API_URL` | Vercel KV dashboard | Free tier |
| `KV_REST_API_TOKEN` | Vercel KV dashboard | Free tier |

---

## 17. Quality Checklist (before each deploy)

- [ ] All 8 locale message files complete (no missing keys)
- [ ] `generateStaticParams` returns data for all dynamic routes
- [ ] `hreflang` tags present on all pages
- [ ] Schema.org JSON-LD valid (test with Google Rich Results)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Visitor counter increments correctly
- [ ] Adsterra placeholder divs present on all pages
- [ ] Webhook fires on compare tool usage
- [ ] Mobile layout verified at 375px, 768px, 1024px
- [ ] Lighthouse score: Performance >85, SEO >95, Accessibility >90
- [ ] ISR revalidation confirmed working (check response headers)
- [ ] No console errors in production build

---

## 18. Notes & Constraints

- **Cost**: $0 — all APIs free, Vercel free tier, Railway free tier if needed
- **No user auth**: fully public, no login
- **Affiliate**: no affiliate links in this project
- **Data freshness**: FRED/BLS data cached 24h via ISR; FedWatch JSON updated manually weekly
- **Error handling**: if FRED API fails, show last cached data with timestamp; never show empty charts
- **Rate limiting**: implement exponential backoff on BLS API (25 req/day limit)
