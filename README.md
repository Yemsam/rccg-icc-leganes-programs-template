# RCC Leganés 2026 PWA

This GitHub Pages-ready package contains:

- `index.html` — annual programme site with monthly stats, upcoming programme view, interactive month slider, interactive histogram, downloads, print-to-PDF controls, bilingual UI, theme toggle, and Firebase comments support.
- `manifest.webmanifest` — installable PWA metadata.
- `sw.js` — service worker for the PWA.
- `icons/` — app icons, including the RCCG church logo used by the app.
- `404.html`, `robots.txt`, `.nojekyll` — GitHub Pages support files.
- `.github/workflows/pages.yml` — optional automatic GitHub Pages deployment workflow.
- `data/*.csv` — editable spreadsheet-friendly programme, finance-list, currency, and report-recipient files.
- `data/finance-access.csv` — finance-page names and unique codes for the private deployment.

## GitHub Pages deployment

Upload the files in this folder to the root of the GitHub Pages site (or keep the same relative folder structure). For automatic deployment, push the repository to GitHub, select **GitHub Actions** as the Pages source, and keep the workflow on the `main` branch.

The site includes a native install prompt where the browser supports `beforeinstallprompt`, and an Add-to-Home-Screen instruction path for iOS Safari. The core schedule is fully static and works without a server.

## Editable configuration

The public repository contains sample programmes and placeholder names only. In the private deployment, edit the CSV files in `data/` to change programmes, members, authorizers, currencies, income categories, expense categories, and report recipients. These CSV files open directly in Excel. The application code does not need to change for those updates.

Keep real names, email addresses, and financial records only in the private repository or a protected service. Do not copy them into the public template.

CSV is used instead of Word or native Excel workbooks because Excel opens and saves CSV files directly, while browsers can read CSV without an additional application or paid service. `data/app-config.js` remains as an internal fallback if a CSV file is unavailable.

The CSV file formats are:

- `programs.csv`: `id`, `start`, `end`, `title_en`, `title_es`
- `members.csv`, `authorizers.csv`, `income-categories.csv`, `expense-categories.csv`: `name`
- `currencies.csv`: `code`, `label`, `symbol`
- `report-recipients.csv`: `email`
- `finance-access.csv`: `name`, `code`

## Finance access code

The Finance button asks for a unique code from `data/finance-access.csv`. Each row contains a person's name and code. An incorrect code displays an alert; after three incorrect attempts, the app returns to the Programs page. This is a casual access gate for the static version, not strong security: the browser receives the code list and a technically experienced visitor could inspect the site. Use server-side authentication and shared protected storage before treating the finance area as confidential.

## Downloads

The site can download the full programme or the selected month as CSV or iCalendar (`.ics`). It also provides print/save-to-PDF controls using the browser print dialog, which works on GitHub Pages without a server.

## Finance workspace

The Finance workspace currently records income and expenses locally on the device using browser storage. It supports tithe and vow names, offering dates and programme links, welfare and miscellaneous descriptions with authorization, multiple currencies, a searchable ledger, weekly/monthly/quarterly/half-year/yearly reports, period comparison, category analysis, and CSV export. The finance view is available for read-only report viewing without entering a new record. Back up exported CSV files regularly because local browser storage is device-specific.

Automatic end-of-month PDF email is not enabled by the static GitHub Pages version. That requires moving finance records to shared storage and running a scheduled server-side job. The configuration already includes report recipients so this can be added later without changing the app's editable settings.

## Logo

The supplied `icons/Rccg_logo.png` is used for the browser favicon, header branding, and installed PWA icon. The service worker caches this existing asset so installation does not depend on missing icon filenames.

## Optional comments

Community comments only activate when the hosting environment provides `__firebase_config`. If enabled, configure Firestore security rules, moderation, and anti-spam limits before publishing the site publicly. Without Firebase configuration, the page shows the schedule normally and hides the unavailable comment backend gracefully.
