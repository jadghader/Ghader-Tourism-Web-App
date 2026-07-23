# Ghader Tourism

Production website for private airport transfers, chauffeur services, and tours across Lebanon. The experience is bilingual (English/Arabic), mobile-first, and optimized around direct WhatsApp booking.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The reviews page currently uses static default reviews and does not read from or write to Firestore.

## Release checks

```bash
npm run lint
npm run build
npm run preview
```

The production build creates route-specific HTML metadata entry points for `/transfers`, `/tours`, `/fleet`, `/about`, `/reviews`, and `/contact`. Firebase Hosting serves these files directly and falls back to the SPA for unknown client routes.

Before deployment, verify the phone number, email, business address, service claims, social profile URLs, review figures, and all displayed prices against current business records. Then configure the production environment, submit `https://ghadertourism.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and verify the Google Business Profile website/WhatsApp links.

Pushes to `main` run `.github/workflows/firebase-hosting.yml`. The workflow type-checks and builds the site, validates the Firebase configuration, and deploys both Hosting and Firestore rules to the `ghader-tourism` project. Configure these GitHub repository secrets before running it:

- `FIREBASE_SERVICE_ACCOUNT_BASE64`: base64-encoded Firebase service-account JSON with permission to deploy Hosting and Firestore rules.
- `VITE_FIREBASE_CONFIG_BASE64`: base64-encoded Firebase web-app configuration JSON used by the client.
- `VITE_GA_MEASUREMENT_ID`: optional GA4 measurement ID.

Firestore review access is disabled by the security rules. Reviews can be connected to a moderated backend later if public submissions are reintroduced.
