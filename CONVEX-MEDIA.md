# Convex media integration

Deployment: https://sensible-crab-500.convex.cloud

The media table contains 72 image records. Each record has Arabic/English names, category, content hash, original PNG storage reference, and optimized WebP storage reference. Public `media:list` returns gallery metadata and file URLs. Upload URL creation and metadata writes are internal functions, available only to authenticated tooling. No deployment key is exposed in browser code.

`node scripts/upload-gallery.cjs` uploads images from `كل الصور - All Images`, skips already uploaded matching files, and regenerates `src/cloud-media.json` and `src/gallery-data.ts`. It deliberately removes an unrelated inherited deploy key and explicitly targets `sensible-crab-500` using the existing Convex CLI login. The frontend uses the saved cloud URLs with bundled local images as fallback. Rerun the script after changing the image catalog.

The gallery at `#/gallery` includes 16 packaging concepts, 24 plated products, 24 packaged products and 8 brand assets. Original local PNGs remain untouched. The website is served locally on port8081. Local development uses the SQLite API on port8082. The published Cloudflare website uses a separate D1 database and same-origin Worker API for orders and staff administration; see CLOUDFLARE.md. Orders have not been migrated to Convex.

Verification: all72 gallery cloud images decoded in browser; metadata count72; unauthenticated upload rejected; bilingual filters/search, image enlargement, Escape close, scroll restoration, paired menu photos, cart add, and mobile overflow passed. TypeScript, Expo web export, and existing order API tests passed.
