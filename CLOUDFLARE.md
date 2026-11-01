# Cloudflare deployment

Live website: https://dopaminsweets.com

The custom domains `dopaminsweets.com` and `www.dopaminsweets.com` point to the existing `dopamin` Pages project. Cloudflare manages their DNS and HTTPS certificates. The Pages fallback address remains https://dopamin-bj1.pages.dev. Social preview and canonical metadata use the primary custom domain.

All other addresses (`www.dopaminsweets.com`, `*.pages.dev`, the `workers.dev` address) redirect to the primary domain in the browser once deployed. The worker keeps serving `/api/*` on its own address because Pages forwards to it. Security headers come from `public/_headers`.

Staff dashboard: https://dopaminsweets.com/#/admin

## Approved website identity

The shareable brand guide is https://dopaminsweets.com/brand/. Downloadable CSS and JSON are served at `/brand/colors.css` and `/brand/tokens.json`. `branding/website-identity.json` is the source of truth; `npm run build:brand` generates the website tokens, guide and optimized assets from committed `assets/brand/` sources. Both web build commands run this step automatically. The site uses the user-approved Nardo, sage, powder blue, olive and slate brush identity, with accessible dark action colors. Packaging originals and the local guide copy are saved in `كل الصور - All Images/التصميم المعتمد النهائي - Final Approved Design/`.

The `dopamine-boutique` Worker serves the Expo web export from `dist/` and the same-origin `/api/*` endpoints. D1 database `dopamine-orders` persists online customer orders, bookings and staff sessions. Convex hosts the image gallery. This deployment does not require the shop's computer to remain running.

## Deploy

Run `npm ci`, `npm run typecheck`, and `npm run build:web`. Authenticate with `npx wrangler login` for the account in `wrangler.jsonc`. Apply new migrations using `npx wrangler d1 migrations apply dopamine-orders --remote`, then run `npx wrangler deploy`.

Set `DOPAMINE_ADMIN_KEY` with `npx wrangler secret put DOPAMINE_ADMIN_KEY`. It must never be a public Expo variable. The initial online staff key is saved locally in ignored `.data/cloud-admin-key.txt`; open `/#/admin` and use this key. Staff sessions expire after eight hours; logout revokes them immediately. After rotating a compromised key, revoke sessions with `DELETE FROM sessions` through D1.

The old local SQLite API has been removed; any data in ignored `.data/` was never part of the online database. Customer history is scoped to the device token that submitted the order; `/api/track` also finds a single order by request number and phone, and omits the name, phone and address from its response. Neither website nor app collects payments; prices await confirmation and bookings remain pending until staff review.

## Local Worker verification

1. `npm run build:web`
2. `npx wrangler d1 migrations apply dopamine-orders --local`
3. `npx wrangler dev --port 8787 --var DOPAMINE_ADMIN_KEY:test-key-only`
4. In another terminal: `npm run test:cloudflare`

This test targets only localhost and creates synthetic records in the local D1 emulator. It checks private customer history, server-side pricing and validation, concurrent submission deduplication, authenticated staff changes, conflicting updates, logout, request-size limits and cross-origin rejection. Never use the test key for production.

Daily scheduled cleanup removes expired sessions and rate-limit entries. Order writes and status changes use atomic D1 statements. GitHub contains sources and assets; Cloudflare deployment is performed explicitly with Wrangler, not automatically on each push.

## Short Pages address

`npm run deploy:pages` builds the website into ignored `dist-pages/` and deploys the `dopamin` Pages project. Its assigned domain is `dopamin-bj1.pages.dev`. The Pages configuration lives in `cloudflare/pages/`; run Pages commands from that directory. Set `CLOUDFLARE_ACCOUNT_ID=976bd8e7c24217500671163086e738bc` when multiple accounts are available.

API routes forward the original request over the `ORDERS` service binding to `dopamine-boutique`. This keeps the existing D1 database, staff key, authorization, validation and scheduled cleanup in one backend. Other assets are served by Pages. After frontend updates run `npm run deploy:pages`; after backend updates run `npm run deploy:cloudflare`. Customer tokens are origin-specific, so a customer who ordered on an older address uses request number and phone to track it. Staff see all requests.

## Backups

D1 Time Travel can restore the database to any point in the last 30 days. For an offline copy run `npm run backup:orders`, which writes the ignored `backups/orders.sql`. It contains customer names, phones and addresses, so keep it private.
