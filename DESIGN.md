---
name: Dopamine
description: A warm bilingual confectionery boutique, with indulgence in balance.
colors:
  primary: "#A8B798"
  rose: "#B6CDD6"
  bg: "#F4F4F1"
  ink: "#454B4B"
  muted: "#5F6963"
  accent: "#435342"
  line: "#D4DAD1"
  surface: "#E9EDE6"
  white: "#FFFFFF"
  status-pending-bg: "#F0EEDD"
  status-pending-text: "#675C31"
  status-preparing-bg: "#E4EDF1"
  status-preparing-text: "#465E6A"
  status-ready-bg: "#E5ECDE"
  status-ready-text: "#3F5B43"
  status-cancelled-bg: "#F2E7E5"
  status-cancelled-text: "#88453E"
  error-bg: "#F7ECEA"
  error-border: "#A85E55"
typography:
  display:
    fontFamily: "Aref Ruqaa, serif"
    fontSize: "clamp(42px,4.6vw,66px)"
    fontWeight: 400
    lineHeight: 1.5
  headline:
    fontFamily: "Aref Ruqaa, serif"
    fontSize: "clamp(32px,3.4vw,48px)"
    fontWeight: 400
  title:
    fontFamily: "Amiri, serif"
    fontSize: "22px"
    fontWeight: 400
  product-title:
    fontFamily: "Amiri, serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.55
  collection-title:
    fontFamily: "Amiri, serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Amiri, serif"
    fontSize: "18px"
  english:
    fontFamily: "Antic Didone, serif"
  button:
    fontFamily: "Amiri, serif"
    fontSize: "16px"
  label:
    fontFamily: "Antic Didone, serif"
    fontSize: "12px"
  operate:
    fontFamily: "Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  operate-heading:
    fontFamily: "Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 500
  field-label:
    fontFamily: "Arial, sans-serif"
    fontSize: "14px"
rounded:
  subtle: "3px"
  toast: "4px"
  circle: "50%"
  field: "4px"
  order-card: "12px"
  status: "20px"
  square: "0"
  media-card: "10px"
  compact-media: "8px"
  category-arch: "100px 100px 10px 10px"
  product-action: "5px"
  media-control: "6px"
spacing:
  compact: "8px"
  small: "12px"
  regular: "16px"
  medium: "20px"
  generous: "24px"
  wide: "30px"
  media-grid: "28px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.media-control}"
    padding: "12px 25px"
    typography: "{typography.button}"
  button-primary-hover:
    backgroundColor: "#344334"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.media-control}"
    padding: "12px 25px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  product-image:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.media-card}"
  product-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
  category-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.category-arch}"
    padding: "10px 10px 18px"
  gift-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media-card}"
  product-add:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.product-action}"
    padding: "8px 13px"
  media-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media-control}"
    padding: "10px 16px"
  menu-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.product-action}"
    padding: "12px"
  menu-filter-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
  photo-viewer:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.order-card}"
    width: "min(920px,94vw)"
  cart-panel:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    padding: "28px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.toast}"
    padding: "12px 24px"
  order-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px"
  order-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.order-card}"
    padding: "25px"
  status-pending:
    backgroundColor: "{colors.status-pending-bg}"
    textColor: "{colors.status-pending-text}"
    rounded: "{rounded.status}"
    padding: "5px 10px"
  status-preparing:
    backgroundColor: "{colors.status-preparing-bg}"
    textColor: "{colors.status-preparing-text}"
    rounded: "{rounded.status}"
    padding: "5px 10px"
  status-ready:
    backgroundColor: "{colors.status-ready-bg}"
    textColor: "{colors.status-ready-text}"
    rounded: "{rounded.status}"
    padding: "5px 10px"
  status-cancelled:
    backgroundColor: "{colors.status-cancelled-bg}"
    textColor: "{colors.status-cancelled-text}"
    rounded: "{rounded.status}"
    padding: "5px 10px"
---

# Design System: Dopamine

## Overview

**Creative North Star: "A calm confectionery boutique"**

Nardo surfaces, the supplied heart-script logo, and approved sunlit dessert photography establish a quiet boutique. Sage and powder blue carry the atmosphere; deep sage concentrates attention on actions and selected states. Editorial space, arched category frames and open product presentations give the existing identity room to breathe.

Arabic is the initial reading direction, with literary display lettering and generous text leading. English uses the established high-contrast serif. Operational forms and preparation schedules retain Arial and the brand palette. The implemented web surface is authoritative: `App.web.tsx` loads `src/boutique.css` after the earlier identity, storefront and section-photography styles. This 2026-11-06 record supersedes the earlier full-width overlay hero, square category frames and enclosed menu-card descriptions. It does not establish a native-app redesign.

**Key Characteristics:**
- Nardo surfaces, graphite text, sage actions and powder-blue section backgrounds.
- The original heart-script logo and established Arabic/English typography.
- Approved lifestyle photography framed by arches and restrained corners.
- Open product presentations, aligned actions, fine rules and generous editorial space.

## Colors

`branding/website-identity.json` remains the palette and font authority; `src/brand-tokens.css` exposes its implemented values. Frontmatter preserves those existing primitives rather than establishing a replacement palette. The downloadable visual guide remains at `/brand/`.

### Primary
- **Sage (`primary`):** quiet accents and identity artwork.
- **Deep sage (`accent`):** primary actions, selected menu filters and the announcement strip.

### Secondary
- **Powder blue (`rose`):** the established blue identity accent. Its existing pale sky surface supports gifts, booking imagery and cart summaries.

### Neutral
- **Nardo (`bg`):** the page canvas, gift cards, cart and photo dialog.
- **Graphite (`ink`):** principal text and the original logo.
- **Muted green-gray (`muted`):** supporting copy and metadata.
- **Quiet sage rule (`line`):** navigation, section, card-action and cart dividers.
- **Sage surface (`surface`):** the menu filter panel, ordering section and image placeholders.
- **White (`white`):** category frames, form fields and text over deep sage actions.

**The Deep Sage Action Rule.** Use deep sage to identify primary actions and selected filters; keep editorial text graphite and the surrounding canvas quiet.

### Operational status colors
Pending uses the amber pair; confirmed and preparing share the blue-gray pair; ready and completed share the green pair; cancelled uses the muted red pair. Error surfaces use their existing semantic background and border. These are feedback colors, not new brand accents. Always display the written status alongside its color.

## Typography

**Display Font:** Aref Ruqaa, with serif fallback.
**Body Font:** Amiri, with serif fallback.
**English Font:** Antic Didone, with serif fallback.

Arabic display remains expressive and unemboldened. English headings and editorial copy use the established serif. Arial serves compact numeric counts and operational forms, receipts, customer orders and administration.

### Hierarchy
- **Display:** the fluid frontmatter role serves the split hero with 1.5 leading. At 700px and below it becomes 40px in Arabic and 38px in English, with 1.45 leading.
- **Headline:** section headings use the incumbent fluid headline role and 1.5 leading.
- **Title:** product names use the product-title role and 1.55 leading; category and gift names use the collection-title role. All three become 21px on mobile. Secondary product translations use 13px and are hidden at the mobile breakpoint.
- **Body:** the root role remains 18px. Hero copy uses 20px, 1.9 leading and a 38ch maximum measure, reducing to 18px on mobile.
- **Label:** menu metadata and price-confirmation text use 13px; product actions use 15px, reducing to 14px on mobile. Category descriptions use 15px, reducing to 14px. Counts use Arial at 12px.

**The Language Pairing Rule.** Preserve the implemented Arabic and English family relationship and reading direction when extending a surface.

**The Operate Typography Rule.** Use Arial for order forms, request records and preparation schedules in both languages; keep the boutique display pairing on editorial surfaces.

## Layout

The public storefront uses a centered 1240px maximum width with 89.6% fluid width, becoming 90% on mobile. The desktop header places the original logo, customer navigation and language/bag actions in one row. Mobile keeps logo/actions above a dedicated navigation row.

The homepage opens with separate copy and photography columns in a 0.88fr / 1.12fr ratio and a 5% gap. Copy stays on the solid canvas. The photograph has a contained caption link over its lower edge; it is not a full-width text-overlay hero. Its height is 550px, then 480px at 1100px and below. At 700px the hero stacks copy above a 330px photograph. The four photographic category entries use four columns, becoming two on mobile.

The shopping area pairs a 225px filter sidebar with flexible results, with a 36px gap. At 1100px the sidebar becomes 190px with a 24px gap and products move from three columns to two. At 700px the sidebar becomes a toolbar above the two-column product grid. Mobile controls omit sidebar explanatory copy and counts while preserving search, selected states and all categories. Product cards stretch evenly and push their price/action area to the bottom.

Gifts and story use paired editorial columns on desktop and stack on mobile. Desktop gift cards form a three-column grid; on mobile each becomes a compact row with a 42% image column and adjacent copy. Shared page headers use a breadcrumb, heading, description and a small image; the image is hidden on mobile. Booking retains its desktop form/selection pairing and form-first mobile order.

Arabic uses RTL and English uses LTR; logical spacing and directional arrows follow the active language. Operational order records and schedules retain their established responsive grids. The cart is a right-side native-dialog drawer constrained to `min(560px, 100vw)`, with 28px padding, reducing to 20px on mobile.

## Elevation & Depth

The storefront is predominantly flat. Photography, Nardo/sage/sky tonal bands, whitespace and fine rules establish hierarchy. Product presentations have transparent backgrounds and no enclosing borders or shadows; category and gift containers use quiet surfaces. The native dialogs retain the existing dark translucent backdrop, with the cart's existing blur.

Product imagery scales to 1.035 over 0.35s on hover. Existing actions retain their modest state transitions; menu selected states change surface and text color. Reduced-motion preference suppresses transitions and animations and restores automatic scrolling. Do not promote retired photograph-stamp shadows or historical gallery animations into current system rules.

## Shapes

Arches are reserved for the hero and photographic category navigation. The hero uses pronounced top corners (160px desktop, 90px mobile) and restrained lower corners. Category frames use the frontmatter category-arch shape with inset image arches. These are intentional image frames, not the shape for every control.

Reusable product imagery, gift cards, the filter panel and booking panels use the media-card radius. Small cart and page-header images and cart summaries use compact-media corners. Storefront actions and search use media-control corners; product-add actions and menu filters use product-action corners. Product copy remains open on the page, with square, transparent outer containers.

Operational records and photo dialogs retain order-card corners; native form fields retain field corners; statuses retain their pill shape. Bag and close controls use their existing capsule or circular shapes. Fine structural rules are generally 1px.

## Components

### Buttons
Primary storefront actions use deep sage, white text and a 50px minimum height; secondary text links retain visible underlines. Product-add actions are full-width outlined controls, at least 44px tall, with deep sage text and a deep sage/white hover state. Visible focus remains part of all actions. Preserve disabled and saving feedback.

### Filters and Search
The menu has an all-products filter and three catalog-category filters. Desktop filters stack with counts; mobile filters form a single row without counts. Selected filters fill deep sage and expose `aria-pressed`. Search is bilingual, visibly labelled for assistive technology, at least 46px tall and uses the existing slate focus outline. Search, category selection and reset update a live result count.

Six products appear initially; the expansion control reveals all matching products. Search or selecting a category immediately shows every match. Photographic tarts, cups and desserts entries clear search, select their existing category and move focus to the menu heading; the protein-ball entry opens its approved gift booking.

### Product and Gift Presentations
Each product shows one approved plated image with an enlargement action, category metadata, a primary name, desktop translation, price-confirmation text and an aligned outlined Add to bag control. Copy has 16px top spacing, reducing to 12px on mobile. A fine rule separates its price/action area.

**The Open Product Rule.** Keep menu photography, product copy and aligned actions visually connected on the page canvas without enclosing the entire product in a filled card.

Gift cards keep approved box imagery and editable booking links, with Nardo copy surfaces and fine action dividers. Mobile rows retain the same content and link semantics. The public packaging gallery remains retired; legacy gallery links resolve to the gifts section.

### Approved Photography
The latest menu raster set contains all 24 products on sunlit Nardo stone with sage/powder-blue ceramics. `branding/menu-photography.json` is its inventory. The approved six-role section set and responsive WebP variants are recorded in `branding/section-photography.json`. Hero, categories and gifts reuse these photographs; no new raster imagery was generated for the boutique UI redesign. The hero is high priority; lower photographs load lazily.

Preserve approved subjects and horizontal drybrush artwork. Lifestyle images may be cropped by their implemented frame; the photo dialog contains its image without cropping. Do not restore old beige, peach or pink menu backgrounds or plates. Future cup imagery must follow `branding/approved-cups.json` and its taller real open-container reference; that reference establishes neither a lid nor exact dimensions. Preserve original files and bilingual archives.

### Navigation and Page Headers
Preserve the original heart-script logo and the four customer links. Navigation uses text links with understated hover underlines, language switching and the bag count; SVG icons retain visible focus and accessible names. Shared inner-page headers use an understated breadcrumb and fine bottom divider, with a small approved gift image on desktop. The former solid sky heading block and decorative brush edge are superseded.

### Bag, Image Viewer and Forms
The bag drawer uses open item rows separated by fine rules, compact images, quantity controls, a sky-tinted summary and an anchored action area. The photo dialog retains a sticky title/close row, contained image and original-image link. Native focus handling, Escape dismissal and restored body scrolling remain required.

Operational fields retain visible labels, neutral borders, existing focus/error feedback and disabled saving states. Phone entry stays LTR; date and time remain paired; conditional address fields follow fulfilment choice. Booking panels use restrained rounded surfaces and generous padding. Customer empty states retain a clear next action.

### Order Status and Preparation Schedule
Statuses combine text with the existing semantic color pairs. Requests, receipts and preparation records show Qatar time and pending staff confirmation. Preserve the configured 24-hour lead time and 10:00–22:00 request window; these are existing application rules, not newly verified opening-hour claims. Prices remain unconfirmed and there is no online payment. The redesign does not change catalog, validation, server behavior or native-app styling.

## Do's and Don'ts

### Do:
- **Do** preserve the original logo, approved palette, bilingual typography and reading direction.
- **Do** reuse approved sunlit menu and section photography, keeping its physical subjects and brush identity intact.
- **Do** use open product presentations, aligned actions, fine rules and sage/powder-blue tonal sections.
- **Do** provide visible keyboard focus, meaningful labels and reduced-motion behavior.
- **Do** pair every operational status color with written text and display Qatar time for scheduled requests.

### Don't:
- **Don't** replace the approved identity with a generic wordmark, new palette or new font system.
- **Don't** restore the superseded full-width overlay hero or enclosed gallery-card layout as the current storefront pattern.
- **Don't** spread arches, drybrush decoration or container shadows across every control and product.
- **Don't** restore beige, peach or pink backgrounds or plates in customer-facing menu photography.
- **Don't** turn unconfirmed prices, schedules or pending requests into production commerce claims.
