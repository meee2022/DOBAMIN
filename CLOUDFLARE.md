# Cloudflare deployment

Live website: https://dopamin-bj1.pages.dev

Original website (still available): https://dopamine-boutique.eng-mohamdkamal1987.workers.dev

Staff dashboard: https://dopamin-bj1.pages.dev/#/admin

The `dopamine-boutique` Worker serves the Expo web export from `dist/` and the same-origin `/api/*` endpoints. D1 database `dopamine-orders` persists online customer orders, bookings and staff sessions. Convex hosts the image gallery. This deployment does not require the shop's computer to remain running.

## Deploy

Use Node 22.13+ for local SQLite tests. Run `npm ci`, `npm run typecheck`, `npm run test:orders`, and `npm run build:web`. Authenticate with `npx wrangler login` for the account in `wrangler.jsonc`. Apply new migrations using `npx wrangler d1 migrations apply dopamine-orders --remote`, then run `npx wrangler deploy`.

Set `DOPAMINE_ADMIN_KEY` with `npx wrangler secret put DOPAMINE_ADMIN_KEY`. It must never be a public Expo variable. The initial online staff key is saved locally in ignored `.data/cloud-admin-key.txt`; open `/#/admin` and use this key. Local development's `.data/admin-key.txt` is separate. Staff sessions expire after eight hours; logout revokes them immediately. After rotating a compromised key, revoke sessions with `DELETE FROM sessions` through D1.

Local SQLite orders were not copied to the online database. Customer history is scoped to the browser token that submitted the order. The app does not collect payments; prices await confirmation and bookings remain pending until staff review.

## Local Worker verification

1. `npm run build:web`
2. `npx wrangler d1 migrations apply dopamine-orders --local`
3. `npx wrangler dev --port 8787 --var DOPAMINE_ADMIN_KEY:test-key-only`
4. In another terminal: `npm run test:cloudflare`

This test targets only localhost and creates synthetic records in the local D1 emulator. It checks private customer history, server-side pricing and validation, concurrent submission deduplication, authenticated staff changes, conflicting updates, logout, request-size limits and cross-origin rejection. Never use the test key for production.

Daily scheduled cleanup removes expired sessions and rate-limit entries. Order writes and status changes use atomic D1 statements. GitHub contains sources and assets; Cloudflare deployment is performed explicitly with Wrangler, not automatically on each push.

## Short Pages address

`npm run deploy:pages` builds the website into ignored `dist-pages/` and deploys the `dopamin` Pages project. Its assigned domain is `dopamin-bj1.pages.dev`. The Pages configuration lives in `cloudflare/pages/`; run Pages commands from that directory. Set `CLOUDFLARE_ACCOUNT_ID=976bd8e7c24217500671163086e738bc` when multiple accounts are available.

API routes forward the original request over the `ORDERS` service binding to `dopamine-boutique`. This keeps the existing D1 database, staff key, authorization, validation and scheduled cleanup in one backend. Other assets are served by Pages. After frontend updates run `npm run deploy:pages`; after backend updates run `npm run deploy:cloudflare`. Customer browser history tokens are origin-specific, so previous customers must use the original address to view requests submitted there. Staff can see all requests from either address.
