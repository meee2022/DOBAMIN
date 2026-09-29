---
name: Dopamine
description: A warm bilingual confectionery boutique, with indulgence in balance.
colors:
  primary: "#bf9179"
  rose: "#bf9185"
  bg: "#f9f5f2"
  ink: "#462d27"
  muted: "#786057"
  accent: "#650015"
  line: "#dfcfc4"
  surface: "#f0e7df"
  white: "#fffdfb"
  status-pending-bg: "#f4e8cf"
  status-pending-text: "#735011"
  status-preparing-bg: "#e9e4f2"
  status-preparing-text: "#594477"
  status-ready-bg: "#e1ede3"
  status-ready-text: "#32633d"
  status-cancelled-bg: "#efe5e4"
  status-cancelled-text: "#82443c"
  error-bg: "#f6e6e5"
  error-border: "#b77e81"
typography:
  display:
    fontFamily: "Aref Ruqaa, serif"
    fontSize: "clamp(42px,4.5vw,70px)"
    fontWeight: 400
    lineHeight: 1.55
  headline:
    fontFamily: "Aref Ruqaa, serif"
    fontSize: "40px"
    fontWeight: 400
  title:
    fontFamily: "Amiri, serif"
    fontSize: "22px"
    fontWeight: 400
  product-title:
    fontFamily: "Amiri, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.55
  gallery-title:
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
  media-card: "14px"
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
    rounded: "{rounded.subtle}"
    padding: "12px 25px"
    typography: "{typography.button}"
  button-primary-hover:
    backgroundColor: "#470111"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.subtle}"
    padding: "12px 25px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  product-image:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.square}"
  product-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media-card}"
  gallery-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media-card}"
  product-add:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.product-action}"
    padding: "8px 13px"
  media-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media-control}"
    padding: "10px 15px"
  gallery-filter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media-control}"
    padding: "8px 17px"
  gallery-filter-selected:
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
    padding: "27px"
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

Warm paper surfaces, the supplied script logo, and original dessert and packaging imagery establish a quiet boutique. Caramel and cream carry the atmosphere; burgundy concentrates attention on actions and selected states. Fine warm borders enclose product and gallery cards, while editorial sections retain generous open space.

Arabic is the initial reading direction, with literary display lettering and generous text leading. English uses a restrained high-contrast serif. Operational forms and preparation schedules use Arial for both languages while retaining the brand palette. This record describes the implemented web demo in `App.web.tsx`, `src/web.css`, `src/Orders.web.tsx`, `src/orders.css`, `src/menu.css`, `src/ProductCard.web.tsx`, `src/Gallery.web.tsx`, and `src/PhotoViewer.web.tsx`; the deferred native scaffold does not establish a second visual system.

**Key Characteristics:**
- Warm cream surfaces and caramel identity accents.
- Arabic literary display paired with restrained English serif.
- Product photography, fine rules, and generous spacing.
- Warm-white enclosed media cards with rounded corners and focused image enlargement.

## Colors

The palette combines warm confectionery neutrals with a deep burgundy action color. Frontmatter values reproduce the implemented custom properties and operational semantic colors.

### Primary
- **Caramel (`primary`):** announcement background, brand rules, and scrollbar thumb.
- **Burgundy (`accent`):** primary actions, selected collection filters, and keyboard focus.

### Secondary
- **Rose (`rose`):** text-selection background.

### Neutral
- **Cream (`bg`):** page, navigation, cart, and photo-viewer surface.
- **Cocoa (`ink`):** principal text, outlined actions, and toast surface.
- **Muted cocoa (`muted`):** descriptive copy and secondary metadata.
- **Warm rule (`line`):** navigation, collection, cart, and footer dividers.
- **Soft parchment (`surface`):** footer, image placeholders, count badges, and secondary hover.
- **Warm white (`white`):** product and gallery card surfaces, search and filter controls, and text over burgundy actions and cocoa notifications.

**The Burgundy Action Rule.** Use burgundy to identify actions, selected filters, and keyboard focus; preserve the warm neutral field around them.

### Operational status colors
Pending uses the amber pair; confirmed and preparing share the lavender pair; ready and completed share the green pair; cancelled uses the muted red pair. Error surfaces combine the error background and border with burgundy text. These are semantic feedback colors, not new brand accents. Always display the written status alongside its color.

## Typography

**Display Font:** Aref Ruqaa, with serif fallback.
**Body Font:** Amiri, with serif fallback.
**English Font:** Antic Didone, with serif fallback.

Arabic display is expressive and unemboldened; supporting Amiri text remains spacious and readable. English switches the site family to Antic Didone. Arial serves the language switch and compact numeric count, and intentionally becomes the working typeface for checkout, booking, receipts, customer orders, and administration.

### Hierarchy
- **Display:** the frontmatter fluid role serves the Arabic hero. It becomes 48px below 1050px and 44px below 700px, with mobile leading of 1.4. English hero is 58px, then 43px and 42px at those breakpoints, with leading of 1.25.
- **Headline:** collection headings use the headline role, becoming 31px on mobile. Gift headings use 52px and leading of 1.5, reducing to 43px and 38px. These are established contextual variations, not a mathematical scale.
- **Title:** menu names use the product-title role and become 25px at 600px and below. Gallery names use the gallery-title role. English inherits Antic Didone. Secondary bilingual names use 14px type and 1.6 leading; price-on-confirmation text stays subordinate at 13px.
- **Body:** the root role is 18px. Hero and gifting paragraphs use 19px with leading of 1.9; hero copy is capped at 420px. Mobile hero copy becomes 16px and 345px wide.
- **Label:** category metadata uses muted 12px text; image captions use 13px. Full-size buttons use 16px on desktop and 15px on mobile; product-add actions use 14px.

**The Language Pairing Rule.** Preserve the implemented Arabic and English family relationship and reading direction when extending a surface.

**The Operate Typography Rule.** Use Arial for order forms, request records, and preparation schedules in both languages; keep the boutique display pairing on editorial surfaces. Operational headings are 32px at weight 500, reducing to 26px on mobile; fields use 14px labels, and status labels use 12px.

## Layout

Content sections use a centered maximum width of 1440px, horizontal padding of 5.2%, and vertical padding of 83px and 88px. The desktop header is a three-column arrangement with a centered logo; the hero and gifting section use two columns. Product and gallery grids use three columns with 28px gaps.

At 1050px and below, product and gallery grids become two columns; header and type dimensions compress and the story becomes two columns. At 700px and below, navigation occupies a second header row, hero copy centers above the photograph, and story and gifting stack; section padding becomes 48px 6%. At 600px and below, product and gallery grids become one column with 22px and 24px gaps respectively. Paired product photographs remain two equal columns inside each card. Above 1600px, the hero increases to a 700px minimum height.

Arabic starts right-to-left. Mixed-language editorial areas deliberately use left-to-right layout; translated copy follows the active language. The cart remains a right-side drawer with a width of 460px, constrained to the viewport, and full dynamic viewport height.

Operational pages cap at 1280px with 55px 5% 80px padding; booking and login cap at 650px and 550px respectively. Customer order cards use two columns with 24px gaps. Preparation rows use 90px / flexible / 165px columns for time, details, and status. The summary strip uses four columns. At 700px and below, cards and preparation rows become single-column, summaries become two-column, and status controls move beneath a divider. Date and time fields remain paired.

## Elevation & Depth

The system is predominantly flat: photography, warm tonal bands, whitespace, and fine borders establish depth. Product and gallery cards use warm-white surfaces and fine warm borders without outer shadows; hover changes their border to caramel. The photograph stamp uses a diffuse shadow (`0 4px 18px #462d2710`). The cart backdrop combines translucent cocoa with a 3px blur. The photo viewer uses a separate dark translucent backdrop (`#271c19cf`) without blur.

Hover lifts full-size actions by 2px and gently scales product photography to 1.035. The shared easing is `cubic-bezier(.16,1,.3,1)`. Reduced-motion preference disables animations and transitions and restores automatic scrolling.

## Shapes

Product and gallery cards use 14px corners and clip their imagery. Product image buttons have square internal corners, with two square images separated by 3px; gallery cards contain one square image. Media search and gallery filters use 6px corners; product-add buttons use 5px. Bag counts, image-expand affordances, and the photograph stamp are circular; retain these distinctions instead of applying one radius everywhere. Decorative and structural lines are usually 1px; active collection filters use a 2px underline.

Operational records use 12px corners and a 1px warm-rule border, without shadows. Fields use 4px corners; status labels use 20px corners. Operational grouping remains distinct from the larger-cornered media cards.

## Components

### Buttons
Primary actions are burgundy with warm-white text; secondary actions are transparent with a 1px cocoa border. Shared minimum height is 51px, reducing to 48px on mobile. Hover darkens primary actions or fills secondary actions with parchment. All links and buttons receive a 2px burgundy focus outline with 5px offset. Disabled buttons use 0.45 opacity and a not-allowed cursor.

### Chips
Product categories are muted text metadata with a short bottom rule within the card copy. Collection filters remain underlined text buttons. Gallery filters are warm-white bordered buttons with category counts; their pressed state fills burgundy with warm-white text. Both filter families expose `aria-pressed`.

### Cards / Containers
Product and gallery cards are warm-white, enclosed by a 1px warm-rule border with 14px corners and no shadow. Product cards show packaging and plated views simultaneously, each captioned and clickable for enlargement. Copy uses 17px 22px 22px padding, becoming 16px 20px 20px at 600px. Category, primary name, and translation precede a ruled bottom row with price status and a burgundy Add to bag button. Gallery cards use one generous square image and 21px 24px 26px copy padding. Their circular expand affordance is 40px.

**The Enclosed Media Rule.** Keep product and gallery imagery, bilingual names, and associated actions within warm-white cards with fine warm borders and 14px corners; retain shadow-free surfaces.

### Media Search and Image Viewer
Menu and gallery searches use warm-white fields with 46px minimum height, 6px corners, and a 2px caramel focus outline offset by 2px. Gallery category filters include counts; a separate live status reports matching images. Search matches Arabic and English names. Empty gallery results offer a reset.

The native photo dialog uses a cream surface, 12px corners, width `min(920px,94vw)`, and maximum height of 94dvh. A sticky header holds the title, subtitle, and 44px SVG close control. The image is contained without cropping within 70dvh, with an underlined original-image link beneath. Escape and backdrop dismissal close the dialog; body scrolling is restored on close. Remote media fall back to local assets on image error. Product cards do not animate on entry; gallery images retain a restrained 1.035 hover scale and reduced-motion handling.

### Navigation
Desktop links are text-only with an animated thin burgundy hover underline. The supplied logo anchors the center. Language and bag controls occupy the opposing side; mobile retains the logo and actions above a dedicated navigation row. Icons are thin inline SVG strokes, never text glyph substitutes.

### Bag Drawer and Notifications
The native dialog has a cream surface, a fine header divider, scrollable item list, and an anchored subtotal/action area. Quantity controls are square outlined buttons; remove and close use SVG icons. Empty and completed states center their icon, title, copy, and action. A cocoa toast appears at the lower center with a short fade and vertical transition.

### Operational Forms
Fields use warm-white surfaces, cocoa text, warm-rule borders, 12px padding, and a 45px minimum height. Labels sit above their controls with an 8px gap. Focus uses a 2px caramel outline with 2px offset. Date and time occupy paired columns; phone entry remains left-to-right. Textareas resize vertically. The conditional delivery address follows fulfilment choice. Errors appear inline in a tinted bordered alert, and submission disables the fieldset while saving. The cart form scrolls with its header held sticky.

### Order Status and Preparation Schedule
Statuses always combine a written label with their semantic color pair. Confirmed/preparing and ready/completed deliberately share color families; text distinguishes the exact state. Records group by preparation day, with Qatar time visible next to the time. Explicit date, status, and customer/request search controls precede the records; counts and update feedback remain separate from the records. A labelled native select changes status and exposes saving feedback. Long notes preserve line breaks, wrap, and cap at 65ch. Empty results offer a filter-reset action.

Receipts emphasize the request identifier and requested Qatar date/time, with pending-confirmation wording. The success mark uses the same authored SVG check stroke as the existing interface.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied logo and brand palette.
- **Do** retain Arabic and English reading direction and type pairing.
- **Do** use enclosed warm-white product and gallery cards, fine rules, and warm tonal sections.
- **Do** provide visible keyboard focus and honor reduced-motion preference.
- **Do** pair every operational status color with a written label and display Qatar time for preparation dates.

### Don't:
- **Don't** replace supplied brand assets with a generic wordmark or unrelated palette.
- **Don't** apply container shadows to the bordered product and gallery cards.
- **Don't** treat English category labels as interactive filter controls.
- **Don't** promote demo prices or checkout states into production commerce claims.


