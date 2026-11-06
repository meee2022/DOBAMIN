# Product
<!-- impeccable:product-schema 1 -->
## Platform
web, ios, android
## Stack
Expo with React Native for the native app, a tailored web surface, and a Cloudflare Workers and D1 backend.
## Product Purpose
Dopamine sweets boutique in Qatar. Customers browse the menu, then submit scheduled orders and occasion bookings for staff review.
The public website is the official customer storefront, not a packaging-design gallery. Keep packaging experiments out of customer navigation. Reuse the approved drybrush identity and existing gift-box assets. Legacy gallery links lead to the gifts section. No new image generation is required for this direction.
The 2026-11-06 rollout applies the same identity to navigation, menu photography frames, gifting, booking, cart, tracking and privacy. Approved gift choices link directly to booking and prefill the requested selection. Product-specific food photos retain their subject; they are served from the project assets rather than the former gallery CDN. Original imagery stays in the user's image folders.
## Users
Customers ordering sweets and gifts; shop staff preparing requests by day.
## Brand Commitments
All website Arabic copy uses clear, formal Modern Standard Arabic. Follow `branding/website-copy.md` for terminology, including navigation, forms, notifications, service errors and staff pages. Keep product names and business rules unchanged; retain the English option.
Preserve the original Dopamine heart-script logo. branding/website-identity.json is the source of truth for colors and fonts, based on the approved Nardo, sage, pistachio, powder blue, olive and slate drybrush packaging. BREWSPOT is a structural reference, not the brand.
## Evidence on Hand
The real handheld shop-container photo supplied on 2026-11-02 is the primary physical reference for future cup-based designs and supersedes the earlier squat mockup proportions. Read `branding/approved-cups.json` before creating cup imagery. The actual container is taller and photographed open; numerical dimensions, capacity and actual lid appearance remain unconfirmed.
Dopamine Brand Identity Design1.pdf: brand assets and packaging references.
## Capabilities and Constraints
Arabic and English. Orders and bookings are saved as pending and reviewed by staff. No online payment. Customers track requests by device or by request number and phone. Order rules live in src/shop-config.json.
## Open business inputs
Prices, WhatsApp number, address, confirmed opening hours and lead time, delivery zones and fees, real photography, nutrition and allergen details, and the Single Daily, Daily Gathering and Luxury collections.

## Approved section photography integration — 2026-11-06

The approved six-image section concept is integrated into the web storefront: signature hero, tarts, dessert cups, desserts, protein balls, and gifts. Tarts, cups and desserts select their existing menu filters (`tarte`, `cups`, `desserts`), clear search and move focus to the menu heading. Protein balls link to the existing protein gift booking; the gifts introduction links to occasion booking. The foreground cup in the cups category image is Victoria berry, so that image represents dessert cups generally, not a cheesecake-only selection.

`branding/section-photography.json` records the six roles and twelve public WebP assets, including a 640px-wide variant per role. Originals remain in the bilingual archive identified by `output/section-concept-job.json`; its preliminary-concept status describes the original generation stage. This integration changes the web surface only and does not establish native app integration or change the catalog, prices, order rules or approved identity.
