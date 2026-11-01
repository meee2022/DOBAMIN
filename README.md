# Dopamine

Healthy-sweets boutique in Qatar: a website (https://dopaminsweets.com) and a native mobile app, built from one Expo project with a shared catalog and one Cloudflare backend.

## Project map

| Path | What it is |
| --- | --- |
| `App.web.tsx`, `src/*.web.tsx` | Website shell and pages |
| `src/orders/` | Website checkout, booking, tracking and staff dashboard |
| `App.tsx`, `src/native/` | Native iOS and Android app screens |
| `src/catalog.ts`, `src/menu-data.json`, `src/prices.json` | Products and prices, shared by website, app and server |
| `src/shop-config.json` | WhatsApp, Instagram, address, opening hours and lead time |
| `cloudflare/` | Orders API (`worker.mjs`, `validation.mjs`), D1 migrations, Pages worker, API tests |
| `branding/website-identity.json` | Source of truth for colors and fonts. `npm run build:brand` regenerates tokens and `/brand/` |
| `references/`, `tmp/`, `output/`, `backups/` | Local working files, ignored by git |

## Common edits

- **Prices:** set `price` per product in `src/prices.json`. The server computes totals from this file.
- **Contact and order rules:** edit `src/shop-config.json`. Links appear on the website and app once filled. The website-side and server rules update together.
- **Products:** edit `src/menu-data.json`, `src/prices.json` and the image map in `src/catalog.ts`.
- **Format code:** `npm run format`.

After changing prices or order rules, deploy both the worker and the website, and publish an app update.

## Run locally

```sh
npm install
npm run typecheck
npm run web        # website with hot reload on :8081; order calls need the API below
npm run dev:api    # built website plus API on :8787, staff key: test-key-only
npm start          # native app in Expo Go or a development build
```

With `npm run dev:api` running, `npm run test:cloudflare` tests orders, validation, tracking and staff access against the local database only.

## Native app

A real React Native app with native navigation, bundled product photos, Arabic RTL and English. It submits to the same API as the website, and it has no staff dashboard; staff use `/#/admin` on the website.

First builds need an Expo account, then an Apple Developer and a Google Play account for store release:

```sh
npx eas-cli login
npx eas-cli build --profile preview --platform android
npx eas-cli build --profile production --platform all
npx eas-cli submit --platform all
```

Bundle ID and Android package: `com.dopaminsweets.app`.

## Deployment and operations

See [CLOUDFLARE.md](CLOUDFLARE.md) for hosting, staff access and backups, and [CONVEX-MEDIA.md](CONVEX-MEDIA.md) for gallery images. Pushing to GitHub runs CI only; deployment is a manual Wrangler command.

Images are AI-generated concepts until real photography replaces them. No payment is taken; requests stay pending until staff confirm them.
