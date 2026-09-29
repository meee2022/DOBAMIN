# Dopamine

Expo SDK 56 project. The website is the first review deliverable; the native app is an initial scaffold for the next phase.

```sh
npm install
npm run web
npm run typecheck
npm run build:web
```

The web boutique includes Arabic/English, collection filters, a persistent local cart, scheduled order and booking submission, private customer tracking, and a protected preparation dashboard. Requests are saved to the local API; no payment is taken. The initial menu contains 24 user-supplied products. Prices remain pending confirmation. No nutritional claims are fabricated.

Original logo and photography are extracted from the supplied `Dopamine Brand Identity Design1.pdf`. Packaging references are illustrative and must be cleared for production use. Fonts: Amiri, Aref Ruqaa, Antic Didone via Google Fonts. Commercial Malibu/Benedict font files were not supplied, so original brand lettering is retained through the logo asset.

## Orders and preparation dashboard

Run the API in a second terminal alongside Expo:

```sh
npm run orders:server
npm run web
```

- Store: http://localhost:8081/
- Customer requests: http://localhost:8081/#/orders
- Occasion booking: http://localhost:8081/#/booking
- Staff dashboard: http://localhost:8081/#/admin
- The unique local staff access key is generated in `.data/admin-key.txt`. Open this file locally and paste it into the staff login. Never commit or share it with customers.
- SQLite database: `.data/orders.sqlite`. Back up this directory. Staff login expires after 8 hours and on API restart. Customer access uses a random browser-local token; it is not an account system and does not follow the customer to another device.
- Requests are pending until reviewed. Staff can filter by preparation date, status, customer name, phone or reference; changes refresh for customers every 15 seconds and for staff every 10 seconds.
- Amounts are computed by the server using `src/prices.json`; submitted client prices are ignored. Date/time checks use Qatar time. Duplicate retries use the same request key. Staff status updates reject stale versions.
- Local API binds to 127.0.0.1:8082. Public customer access requires deploying the API with persistent storage and HTTPS, setting `EXPO_PUBLIC_ORDERS_API_URL` before the web build, and configuring `DOPAMINE_ALLOWED_ORIGINS` for the deployed website. `DOPAMINE_ADMIN_KEY`, `DOPAMINE_DATA_DIR`, `HOST` and `PORT` are server settings. Do not expose the local access key in public environment variables.
- Orders are saved; product prices await shop confirmation. No payment, automatic booking guarantee, capacity management, notifications or real delivery integration is included.

Validation: `npm run test:orders` tests persistence across API restarts, isolation between customers, staff authentication, server pricing, invalid dates/quantities, delivery addresses, idempotent submission and concurrent update protection. Browser flow checks use an isolated temporary database, not the actual shop database.


## Image gallery

72 images are available at /#/gallery, including paired plated/packaged product photos and 16 packaging concepts. Originals and optimized versions are stored in Convex; local fallback images and the bilingual All Images folder are included. See CONVEX-MEDIA.md for uploading and refreshing the image catalog. The local image folder contains index.html for browsing offline.

Generated product and packaging images are concepts for review. The native Expo app is still a scaffold; the completed review surface is the website.


## Cloudflare deployment

Cloudflare Workers serves the exported website and same-origin /api routes. D1 stores new online orders independently from the local SQLite database. Convex continues to host the 72 image originals and optimized copies. See CLOUDFLARE.md for deployment and staff access.
