<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Fresh Finish — Agent Directive

> This file is the authoritative specification for AI agents (opencode or otherwise) working on the Fresh Finish codebase. Follow every section precisely. When in doubt, prefer explicitness, type safety, and production-readiness over shortcuts.

---

## Project Overview

**Fresh Finish** is a mobile-first web application for a premium mobile auto detailing business. This is a working/placeholder name and may change in the future — it was chosen as a more descriptive alternative to "powerwash app", a previous iteration of this project. Treat the name as a variable: never hardcode it directly in UI or metadata. Reference it exclusively via the `NEXT_PUBLIC_APP_NAME` environment variable or a central `config/app.ts` constant.

**Current build phase: Static UI Shell.** The goal right now is to build the full visual experience of the application — layout, branding, components, and pages — with no backend, no database, no auth, and no API calls. All data is hardcoded or mocked. This phase exists to lock in the look and feel before any logic is introduced.

The services offered are:
- **Exterior Wash** — exterior-only cleaning
- **Interior Cleaning** — interior-only cleaning

---

## Tech Stack

| Layer | Technology |
|---|---|
| Node.js | 24.13.0+ |
| Framework | Next.js 16.2.6+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 with CSS custom properties for brand tokens |
| Linting | ESLint + Prettier |

> **Version pins**: Do not install versions below those specified above. If a package manager suggests a lower version, override it explicitly in `package.json`. These minimums exist to avoid known upgrade issues encountered with earlier versions.

> **No backend in this phase.** Do not install or configure Prisma, a database driver, NextAuth, Resend, or any other backend dependency. This phase is UI only.

---

## Brand & Design System

### Color Palette

Define these as CSS custom properties in `styles/globals.css` and map them to Tailwind tokens in `tailwind.config.ts`. All color usage throughout the app must reference these tokens — no hardcoded hex values in components.

```css
--color-navy:   #202940;  /* Primary — page backgrounds, headers */
--color-bark:   #4B4038;  /* Secondary — card backgrounds, section fills */
--color-taupe:  #9A8678;  /* Accent — borders, muted text, dividers */
--color-blush:  #CAAA98;  /* Highlight — CTAs, active states, hover */
--color-light:  #F5F0EC;  /* Text on dark — body copy, headings on dark bg */
```

### Tailwind Token Mapping (`tailwind.config.ts`)

```ts
colors: {
  navy:  '#202940',
  bark:  '#4B4038',
  taupe: '#9A8678',
  blush: '#CAAA98',
  light: '#F5F0EC',
}
```

### Typography Scale

- **Font**: Inter (self-hosted via `next/font/google` — do not use a `<link>` tag).
- **Weights in use**: 400 (body), 500 (labels, UI elements), 700 (headings).
- **Base text color**: `--color-light` on all dark backgrounds.
- **Muted text**: `--color-taupe` for secondary labels, captions, placeholders.

Define and use this scale consistently. Never use arbitrary font sizes outside of it.

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display` | 56px / 3.5rem | 700 | 1.1 | Hero headline |
| `h1` | 40px / 2.5rem | 700 | 1.2 | Page titles |
| `h2` | 30px / 1.875rem | 700 | 1.3 | Section headings |
| `h3` | 22px / 1.375rem | 700 | 1.4 | Card headings |
| `body-lg` | 18px / 1.125rem | 400 | 1.6 | Lead paragraphs, subtext |
| `body` | 16px / 1rem | 400 | 1.6 | Default body copy |
| `label` | 14px / 0.875rem | 500 | 1.4 | Form labels, badges, nav |
| `caption` | 12px / 0.75rem | 400 | 1.4 | Helper text, fine print |

On mobile, `display` scales down to `40px` and `h1` to `30px`. Use Tailwind responsive classes to handle this — do not use fluid typography (`clamp`) unless necessary.

### Spacing & Shape

- **Border radius**: `12px` for cards and containers; `8px` for inputs, buttons, and badges.
- **Page max-width**: `1280px`, centered.
- **Section padding**: `64px` vertical on desktop, `40px` on mobile.
- **Card padding**: `24px`.

### Elevation

Use this named scale consistently. Do not invent one-off shadows.

| Level | CSS | Usage |
|---|---|---|
| `flat` | none | Inline elements, section backgrounds |
| `raised` | `0 4px 24px rgba(0, 0, 0, 0.3)` | Cards, dropdowns |
| `overlay` | `0 8px 40px rgba(0, 0, 0, 0.5)` | Modals, mobile nav drawer |

Add these as Tailwind `boxShadow` tokens in `tailwind.config.ts`:
```ts
boxShadow: {
  raised:  '0 4px 24px rgba(0, 0, 0, 0.3)',
  overlay: '0 8px 40px rgba(0, 0, 0, 0.5)',
}
```

### Button Styles

All buttons use the shared `Button` component in `components/ui/Button.tsx`.

| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `--color-blush` | `--color-navy` | none |
| `ghost` | transparent | `--color-blush` | `1px solid --color-taupe` |
| `danger` | `#C0392B` | white | none |

- Padding: `14px 28px` (default), `10px 20px` (small).
- Font weight: 700.
- Border radius: `8px`.
- Minimum tap target: `48px` height on all variants — pad vertically if needed to meet this on mobile. This is non-negotiable for touch usability.
- Hover: `primary` darkens blush by ~10% (`#b8967f`); `ghost` fills background with `--color-bark`.
- Active (pressed): slight scale down — `transform: scale(0.97)`.
- Focus: visible `outline: 2px solid --color-blush` with `outline-offset: 2px` for keyboard accessibility.
- Transition: `background-color 150ms ease, transform 150ms ease, opacity 150ms ease` on all variants. No jarring instant state changes.

---

## Design Principles

- **Mobile-first**: Design for 375px viewport first. Scale up to 768px (tablet) and 1280px (desktop) using Tailwind responsive prefixes (`md:`, `lg:`).
- **Dark, premium aesthetic**: `--color-navy` is the default page background. Never use a white or light-colored page background.
- **Generous whitespace**: Avoid cramped layouts. Let content breathe.
- **High contrast**: Light text on dark surfaces. Meet WCAG AA contrast ratios throughout.
- **No stock UI aesthetics**: Avoid default Tailwind component patterns that look generic. The design should feel considered and premium.

---

## UI Polish & Motion

This section defines the micro-interaction and motion standards that give the UI a premium, responsive feel — similar to what Material UI achieves through its transition system. Every interactive element should *react* to the user. Static, instant state changes are not acceptable.

### Transition Defaults

Apply these globally via `globals.css` or Tailwind's `transition` utilities:

```css
/* Default transition for interactive elements */
transition-property: background-color, border-color, color, box-shadow, transform, opacity;
transition-duration: 150ms;
transition-timing-function: ease;
```

Use `200ms` for larger elements (cards, drawers). Never exceed `300ms` for any UI transition — sluggish animations feel cheap.

### Interactive States — All Elements

Every clickable or focusable element must implement all four states. No exceptions.

| State | Behaviour |
|---|---|
| Default | Base styles as specced |
| Hover | Color/background shift per component spec. Cursor: `pointer`. |
| Active (pressed) | `transform: scale(0.97)` — subtle press-down feel |
| Focus | `outline: 2px solid var(--color-blush)`, `outline-offset: 2px` |
| Disabled | `opacity: 0.4`, `cursor: not-allowed`, no hover/active effects |

### Cards

- On hover: lift slightly with `transform: translateY(-2px)` and deepen shadow from `raised` to `overlay`.
- Transition: `transform 200ms ease, box-shadow 200ms ease`.
- Clickable cards (e.g. service selector on booking page) additionally shift border color to `--color-blush` on hover.

### Form Inputs

Inputs are a primary interaction surface on mobile. They must feel deliberate and responsive.

- Default border: `1px solid var(--color-taupe)`.
- Focus border: `1px solid var(--color-blush)` with a soft glow: `box-shadow: 0 0 0 3px rgba(202, 170, 152, 0.2)`.
- Transition: `border-color 150ms ease, box-shadow 150ms ease`.
- Background: `--color-bark`. Text: `--color-light`. Placeholder: `--color-taupe`.
- Border radius: `8px`. Padding: `12px 16px`.
- Minimum height: `48px` for all inputs on mobile (touch target requirement).
- Error state: border `#C0392B`, glow `rgba(192, 57, 43, 0.2)`, helper text in red below the field.

### Touch Targets (Mobile)

All tappable elements — buttons, links, nav items, time slot buttons, calendar dates, service cards — must have a minimum tap target of **48×48px**. If the visual size is smaller, add invisible padding to meet the requirement. This follows Material Design and Apple HIG guidelines and directly impacts perceived quality on mobile.

### Page & Section Transitions

- Use Next.js's built-in page rendering — no custom page transition animations in this phase.
- Sections on the homepage may use a subtle fade-in-up on scroll using the `IntersectionObserver` API (`opacity: 0 → 1`, `transform: translateY(16px) → translateY(0)`, `duration: 400ms`, `ease-out`). This is optional but recommended for the premium feel. Implement only if it does not introduce layout shift.

### Mobile Nav Drawer

- Slides in from the right (`transform: translateX(100%) → translateX(0)`).
- Transition: `transform 250ms ease`.
- Backdrop: semi-transparent overlay (`rgba(0,0,0,0.5)`) that fades in behind the drawer.
- Closes on: backdrop tap, nav link tap, or `Escape` key.
- Use `shadow-overlay` elevation level.

### Reduced Motion

Respect the user's OS-level motion preference. Wrap all animations in:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Add this to `globals.css`.

```
/
├── app/
│   ├── layout.tsx              # Root layout: font, global styles, Header, Footer
│   ├── page.tsx                # Homepage
│   ├── services/
│   │   └── page.tsx            # Services detail page
│   └── book/
│       └── page.tsx            # Booking page (static UI mock only)
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Card.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   └── sections/               # Page-level sections (used in app/ pages)
│       ├── Hero.tsx
│       ├── ServicesPreview.tsx
│       ├── HowItWorks.tsx
│       └── TrustBar.tsx
├── config/
│   └── app.ts                  # Central app config (name, services, nav links)
├── styles/
│   └── globals.css             # Tailwind directives + CSS custom properties
├── public/                     # Static assets (favicon, og-image placeholder)
├── tailwind.config.ts
├── .env.development
├── .env.example
└── agents.md
```

---

## Central Config (`config/app.ts`)

All hardcoded content lives here. Pages and components import from this file — no content strings scattered across components.

```ts
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Fresh Finish',
  tagline: 'Premium Mobile Detailing, At Your Door.',
  contact: {
    phone: '',       // to be filled in
    email: '',       // to be filled in
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Book Now', href: '/book' },
  ],
  services: [
    {
      id: 'exterior-wash',
      name: 'Exterior Wash',
      category: 'EXTERIOR_WASH',
      description:
        'A thorough exterior clean that restores your vehicle\'s shine. Includes hand wash, wheel cleaning, and a streak-free rinse.',
      duration: 60,       // minutes
      price: 0,           // to be filled in
    },
    {
      id: 'interior-cleaning',
      name: 'Interior Cleaning',
      category: 'INTERIOR_CLEANING',
      description:
        'A deep interior refresh covering vacuuming, surface wipe-down, window cleaning, and odor elimination.',
      duration: 90,       // minutes
      price: 0,           // to be filled in
    },
  ],
} as const;
```

> Prices and contact details are left empty intentionally — they will be filled in before the app goes live. Do not invent placeholder prices.

---

## Pages

### 1. Homepage (`/`)

#### Hero
- Full-width section, `--color-navy` background.
- Large display heading using the `appConfig.tagline` value.
- Short supporting subtext (1–2 sentences describing the business).
- Two CTAs side by side (stacked on mobile): `primary` "Book Now" → `/book`, `ghost` "Our Services" → `/services`.
- No hero image required in this phase — use a subtle decorative element (gradient, abstract shape, or CSS pattern) to add visual interest without a photo dependency.

#### Services Preview
- Two cards, one per service from `appConfig.services`.
- Each card: service name, short description, duration, and a "Book This Service" link → `/book`.
- Cards sit on a `--color-bark` section background with `--color-navy` card background.
- Layout: side-by-side on desktop (`md:grid-cols-2`), stacked on mobile.

#### How It Works
- Three steps: **Choose Your Service** → **Pick a Time** → **We Come to You**.
- Numbered or icon-based. Horizontal on desktop, vertical on mobile.
- Background: `--color-bark`.

#### Trust Bar
- A simple row of trust signals: e.g. "Fully Insured", "No Hidden Fees", "We Come to You", "Satisfaction Guaranteed".
- Background: `--color-navy`. Subdued styling — `--color-taupe` text or icons, not a loud section.

#### Footer
- Business name (from `appConfig.name`), phone, email (from `appConfig.contact`).
- Nav links repeated.
- Copyright line: `© {year} {appConfig.name}. All rights reserved.`
- Background: slightly darker than `--color-navy` — use `#161e33`.

---

### 2. Services Page (`/services`)

- Page heading: "Our Services".
- Render both services from `appConfig.services` as full-width detail cards.
- Each card shows: name, full description, duration, and a "Book This Service" CTA → `/book`.
- Group by category with a subtle category label above each card (e.g. "Exterior" / "Interior").
- CTA section at the bottom of the page: "Ready to book?" with a `primary` button → `/book`.

---

### 3. Booking Page (`/book`) — Static Mock

This page is a visual representation of the booking flow only. No form submission, no API calls, no validation logic beyond basic HTML structure. The goal is to design and approve the layout before wiring it up.

Render all three steps visible simultaneously on the page (not a wizard yet) so the full layout can be reviewed at once. Label each section clearly ("Step 1", "Step 2", "Step 3").

#### Step 1 — Select Service
- Two selectable cards, one per service.
- First card selected by default (visual selected state: `--color-blush` border, slight background tint).
- Show service name, description, and duration on each card.

#### Step 2 — Pick a Date & Time
- A calendar UI (can use `react-day-picker` or a custom grid).
- Style to match the brand: dark background, `--color-blush` for selected date, `--color-taupe` for borders.
- A row of time slot buttons below the calendar. Mock 4–5 slots (e.g. 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM). One slot in a "selected" state, one in a "unavailable" (disabled) state.

#### Step 3 — Your Details
- Fields: Full Name, Email, Phone, Service Address, Vehicle Type (dropdown), Additional Notes (textarea).
- All fields styled to brand: dark input backgrounds (`--color-bark`), light text, `--color-taupe` borders, `--color-blush` focus ring.
- A `primary` "Confirm Booking" button at the bottom. No submit handler yet.

---

## Components

### `components/ui/Button.tsx`
- Accepts `variant` (`primary` | `ghost` | `danger`), `size` (`default` | `sm`), `href` (renders as `<Link>` if provided, otherwise `<button>`), and all standard button/anchor props.
- Never use raw `<button>` or `<a>` tags for CTAs in pages — always use this component.

### `components/ui/Badge.tsx`
- Small pill-shaped label. Used for status indicators and category labels.
- Accepts `variant` (`default` | `success` | `warning` | `danger`).

### `components/ui/Card.tsx`
- Wrapper component with brand border radius, shadow, and padding.
- Accepts `className` for overrides.

### `components/layout/Header.tsx`
- Fixed or sticky at top.
- Left: business name (`appConfig.name`) as a text logo or wordmark.
- Right: nav links from `appConfig.nav`. On mobile: hamburger menu that opens a slide-in or dropdown nav.
- Background: `--color-navy` with a subtle bottom border in `--color-taupe`.

### `components/layout/Footer.tsx`
- See Homepage Footer spec above.

---

## Code Quality Rules

- **TypeScript strict mode** enabled. No `any` types. Prefer `unknown` + type narrowing.
- All components are functional with explicit prop types. No implicit `React.FC`.
- Use server components by default. Only add `"use client"` when the component requires interactivity or browser APIs (e.g. mobile nav toggle, calendar date selection).
- No content strings scattered in JSX — all copy lives in `config/app.ts`.
- No hardcoded hex colors in components — always use Tailwind tokens mapped from the brand palette.
- Co-locate component styles with the component using Tailwind classes. No separate CSS files per component.

---

## Accessibility

- All interactive elements have accessible labels.
- Focus states are visible and use `--color-blush` outline.
- Color contrast meets WCAG AA on all text/background combinations.
- Images (when added) have descriptive `alt` text.
- The mobile nav must be keyboard-navigable and closable with `Escape`.

---

## Environment Variables

```bash
# .env.example

# App
NEXT_PUBLIC_APP_NAME=""   # Business name — update here if branding changes
NEXT_PUBLIC_APP_URL=""    # e.g. http://localhost:3000
```

```bash
# .env.development

NEXT_PUBLIC_APP_NAME="Fresh Finish"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Definition of Done (This Phase)

This phase is complete when:

1. All three pages (`/`, `/services`, `/book`) render correctly at 375px, 768px, and 1280px viewports.
2. The brand palette is applied consistently — no off-brand colors anywhere.
3. The `Button`, `Badge`, and `Card` primitives are implemented and used throughout (no raw `<button>` or ad-hoc card divs).
4. The Header renders on all pages with a working mobile nav.
5. The Footer renders on all pages.
6. TypeScript compiles with zero errors (`tsc --noEmit`).
7. ESLint passes with zero errors.
8. `config/app.ts` is the single source of truth for all content — no hardcoded strings in JSX.
9. No backend dependencies are installed.

---

## Out of Scope (Future Phases)

Do not implement any of the following in this phase. They are tracked here for future build phases.

### Phase 2 — Booking Flow
- Booking form submission and validation (Zod).
- Availability calendar with real date logic (block past dates, Sundays, etc.).
- `POST /api/bookings` API route.
- Prisma 7.8.0+ + PostgreSQL 18+ setup, Docker Compose, dev setup script (`scripts/dev-setup.mjs`).
- Multi-step wizard behavior (currently all steps visible simultaneously for layout review).
- Package additions: `prisma`, `@prisma/client`, `zod`.

### Phase 3 — Customer Identity & Magic Links
- `Customer` and `MagicLinkToken` database models.
- `/my-bookings` pages (email request form + authenticated booking history).
- Customer-facing booking cancellation (24-hour cutoff).
- `POST /api/magic-link/request` and `GET /api/magic-link/verify` routes.
- `PATCH /api/bookings/[id]/cancel` customer-facing route.
- `lib/magic-link.ts` token generation and verification.
- New env vars: `MAGIC_LINK_SECRET`.

### Phase 4 — Admin Dashboard
- Password-protected `/admin` route via Next.js middleware.
- Booking management table with status updates.
- Blocked dates management.
- Admin session cookie auth (`lib/admin-auth.ts`).
- New env vars: `ADMIN_PASSWORD`, `ADMIN_COOKIE_SECRET`.

### Phase 5 — Email & Notifications
- Transactional email via Resend.
- Customer booking confirmation email with magic link.
- Magic link request email.
- Owner notification emails on new bookings.
- Automated appointment reminder emails (24hr before).
- SMS notifications (Twilio or similar).
- Package additions: `resend`, `@react-email/components`.
- New env vars: `RESEND_API_KEY`, `EMAIL_FROM`.

### Phase 6 — Payments & Account Verification
- Stripe deposit payment at booking time.
- Deposit-gated customer account activation as an anti-spam mechanism.
- Refund logic for cancellations.
- Package additions: `stripe`, `@stripe/stripe-js`.

### Phase 7 — Operations & Growth
- Multi-staff / technician scheduling and assignment.
- Service add-ons and upsells at booking time.
- Reviews and ratings system (post-appointment prompt).
- Owner analytics dashboard (revenue, booking trends, popular services).
- Customer-facing rescheduling (currently cancellation only).

> This file is the authoritative specification for AI agents (opencode or otherwise) working on the Fresh Finish codebase. Follow every section precisely. When in doubt, prefer explicitness, type safety, and production-readiness over shortcuts.

---

## Project Overview

**Fresh Finish** is a mobile-first web application for a premium mobile auto detailing business. This is a working/placeholder name and may change in the future — it was chosen as a more descriptive alternative to "powerwash app", a previous iteration of this project. Treat the name as a variable: never hardcode it directly in UI or metadata. Reference it exclusively via the `NEXT_PUBLIC_APP_NAME` environment variable or a central `config/app.ts` constant.

**Current build phase: Static UI Shell.** The goal right now is to build the full visual experience of the application — layout, branding, components, and pages — with no backend, no database, no auth, and no API calls. All data is hardcoded or mocked. This phase exists to lock in the look and feel before any logic is introduced.

The services offered are:
- **Exterior Wash** — exterior-only cleaning
- **Interior Cleaning** — interior-only cleaning

---

## Tech Stack

| Layer | Technology |
|---|---|
| Node.js | 24.13.0+ |
| Framework | Next.js 16.2.6+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 with CSS custom properties for brand tokens |
| Linting | ESLint + Prettier |

> **Version pins**: Do not install versions below those specified above. If a package manager suggests a lower version, override it explicitly in `package.json`. These minimums exist to avoid known upgrade issues encountered with earlier versions.

> **No backend in this phase.** Do not install or configure Prisma, a database driver, NextAuth, Resend, or any other backend dependency. This phase is UI only.

---

## Brand & Design System

### Color Palette

Define these as CSS custom properties in `styles/globals.css` and map them to Tailwind tokens in `tailwind.config.ts`. All color usage throughout the app must reference these tokens — no hardcoded hex values in components.

```css
--color-navy:   #202940;  /* Primary — page backgrounds, headers */
--color-bark:   #4B4038;  /* Secondary — card backgrounds, section fills */
--color-taupe:  #9A8678;  /* Accent — borders, muted text, dividers */
--color-blush:  #CAAA98;  /* Highlight — CTAs, active states, hover */
--color-light:  #F5F0EC;  /* Text on dark — body copy, headings on dark bg */
```

### Tailwind Token Mapping (`tailwind.config.ts`)

```ts
colors: {
  navy:  '#202940',
  bark:  '#4B4038',
  taupe: '#9A8678',
  blush: '#CAAA98',
  light: '#F5F0EC',
}
```

### Typography

- **Font**: Inter (self-hosted via `next/font/google` — do not use a `<link>` tag).
- **Weights in use**: 400 (body), 500 (labels, UI elements), 700 (headings).
- **Base text color**: `--color-light` on all dark backgrounds.
- **Muted text**: `--color-taupe` for secondary labels, captions, placeholders.

### Spacing & Shape

- **Border radius**: `12px` for cards and containers; `8px` for inputs, buttons, and badges.
- **Page max-width**: `1280px`, centered.
- **Section padding**: `64px` vertical on desktop, `40px` on mobile.
- **Card padding**: `24px`.

### Elevation

- Cards on dark backgrounds use: `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3)`.
- No elevation on flat/inline elements.

### Button Styles

All buttons use the shared `Button` component in `components/ui/Button.tsx`.

| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `--color-blush` | `--color-navy` | none |
| `ghost` | transparent | `--color-blush` | `1px solid --color-taupe` |
| `danger` | `#C0392B` | white | none |

- Padding: `14px 28px` (default), `10px 20px` (small).
- Font weight: 700.
- Border radius: `8px`.
- Hover: `primary` darkens blush by ~10%; `ghost` fills with `--color-bark`.
- Focus: visible `outline` using `--color-blush` for keyboard accessibility.

---

## Design Principles

- **Mobile-first**: Design for 375px viewport first. Scale up to 768px (tablet) and 1280px (desktop) using Tailwind responsive prefixes (`md:`, `lg:`).
- **Dark, premium aesthetic**: `--color-navy` is the default page background. Never use a white or light-colored page background.
- **Generous whitespace**: Avoid cramped layouts. Let content breathe.
- **High contrast**: Light text on dark surfaces. Meet WCAG AA contrast ratios throughout.
- **No stock UI aesthetics**: Avoid default Tailwind component patterns that look generic. The design should feel considered and premium.

---

## Repository Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout: font, global styles, Header, Footer
│   ├── page.tsx                # Homepage
│   ├── services/
│   │   └── page.tsx            # Services detail page
│   └── book/
│       └── page.tsx            # Booking page (static UI mock only)
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Card.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   └── sections/               # Page-level sections (used in app/ pages)
│       ├── Hero.tsx
│       ├── ServicesPreview.tsx
│       ├── HowItWorks.tsx
│       └── TrustBar.tsx
├── config/
│   └── app.ts                  # Central app config (name, services, nav links)
├── styles/
│   └── globals.css             # Tailwind directives + CSS custom properties
├── public/                     # Static assets (favicon, og-image placeholder)
├── tailwind.config.ts
├── .env.development
├── .env.example
└── agents.md
```

---

## Central Config (`config/app.ts`)

All hardcoded content lives here. Pages and components import from this file — no content strings scattered across components.

```ts
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Fresh Finish',
  tagline: 'Premium Mobile Detailing, At Your Door.',
  contact: {
    phone: '',       // to be filled in
    email: '',       // to be filled in
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Book Now', href: '/book' },
  ],
  services: [
    {
      id: 'exterior-wash',
      name: 'Exterior Wash',
      category: 'EXTERIOR_WASH',
      description:
        'A thorough exterior clean that restores your vehicle\'s shine. Includes hand wash, wheel cleaning, and a streak-free rinse.',
      duration: 60,       // minutes
      price: 0,           // to be filled in
    },
    {
      id: 'interior-cleaning',
      name: 'Interior Cleaning',
      category: 'INTERIOR_CLEANING',
      description:
        'A deep interior refresh covering vacuuming, surface wipe-down, window cleaning, and odor elimination.',
      duration: 90,       // minutes
      price: 0,           // to be filled in
    },
  ],
} as const;
```

> Prices and contact details are left empty intentionally — they will be filled in before the app goes live. Do not invent placeholder prices.

---

## Pages

### 1. Homepage (`/`)

#### Hero
- Full-width section, `--color-navy` background.
- Large display heading using the `appConfig.tagline` value.
- Short supporting subtext (1–2 sentences describing the business).
- Two CTAs side by side (stacked on mobile): `primary` "Book Now" → `/book`, `ghost` "Our Services" → `/services`.
- No hero image required in this phase — use a subtle decorative element (gradient, abstract shape, or CSS pattern) to add visual interest without a photo dependency.

#### Services Preview
- Two cards, one per service from `appConfig.services`.
- Each card: service name, short description, duration, and a "Book This Service" link → `/book`.
- Cards sit on a `--color-bark` section background with `--color-navy` card background.
- Layout: side-by-side on desktop (`md:grid-cols-2`), stacked on mobile.

#### How It Works
- Three steps: **Choose Your Service** → **Pick a Time** → **We Come to You**.
- Numbered or icon-based. Horizontal on desktop, vertical on mobile.
- Background: `--color-bark`.

#### Trust Bar
- A simple row of trust signals: e.g. "Fully Insured", "No Hidden Fees", "We Come to You", "Satisfaction Guaranteed".
- Background: `--color-navy`. Subdued styling — `--color-taupe` text or icons, not a loud section.

#### Footer
- Business name (from `appConfig.name`), phone, email (from `appConfig.contact`).
- Nav links repeated.
- Copyright line: `© {year} {appConfig.name}. All rights reserved.`
- Background: slightly darker than `--color-navy` — use `#161e33`.

---

### 2. Services Page (`/services`)

- Page heading: "Our Services".
- Render both services from `appConfig.services` as full-width detail cards.
- Each card shows: name, full description, duration, and a "Book This Service" CTA → `/book`.
- Group by category with a subtle category label above each card (e.g. "Exterior" / "Interior").
- CTA section at the bottom of the page: "Ready to book?" with a `primary` button → `/book`.

---

### 3. Booking Page (`/book`) — Static Mock

This page is a visual representation of the booking flow only. No form submission, no API calls, no validation logic beyond basic HTML structure. The goal is to design and approve the layout before wiring it up.

Render all three steps visible simultaneously on the page (not a wizard yet) so the full layout can be reviewed at once. Label each section clearly ("Step 1", "Step 2", "Step 3").

#### Step 1 — Select Service
- Two selectable cards, one per service.
- First card selected by default (visual selected state: `--color-blush` border, slight background tint).
- Show service name, description, and duration on each card.

#### Step 2 — Pick a Date & Time
- A calendar UI (can use `react-day-picker` or a custom grid).
- Style to match the brand: dark background, `--color-blush` for selected date, `--color-taupe` for borders.
- A row of time slot buttons below the calendar. Mock 4–5 slots (e.g. 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM). One slot in a "selected" state, one in a "unavailable" (disabled) state.

#### Step 3 — Your Details
- Fields: Full Name, Email, Phone, Service Address, Vehicle Type (dropdown), Additional Notes (textarea).
- All fields styled to brand: dark input backgrounds (`--color-bark`), light text, `--color-taupe` borders, `--color-blush` focus ring.
- A `primary` "Confirm Booking" button at the bottom. No submit handler yet.

---

## Components

### `components/ui/Button.tsx`
- Accepts `variant` (`primary` | `ghost` | `danger`), `size` (`default` | `sm`), `href` (renders as `<Link>` if provided, otherwise `<button>`), and all standard button/anchor props.
- Never use raw `<button>` or `<a>` tags for CTAs in pages — always use this component.

### `components/ui/Badge.tsx`
- Small pill-shaped label. Used for status indicators and category labels.
- Accepts `variant` (`default` | `success` | `warning` | `danger`).

### `components/ui/Card.tsx`
- Wrapper component with brand border radius, shadow, and padding.
- Accepts `className` for overrides.

### `components/layout/Header.tsx`
- Fixed or sticky at top.
- Left: business name (`appConfig.name`) as a text logo or wordmark.
- Right: nav links from `appConfig.nav`. On mobile: hamburger menu that opens a slide-in or dropdown nav.
- Background: `--color-navy` with a subtle bottom border in `--color-taupe`.

### `components/layout/Footer.tsx`
- See Homepage Footer spec above.

---

## Code Quality Rules

- **TypeScript strict mode** enabled. No `any` types. Prefer `unknown` + type narrowing.
- All components are functional with explicit prop types. No implicit `React.FC`.
- Use server components by default. Only add `"use client"` when the component requires interactivity or browser APIs (e.g. mobile nav toggle, calendar date selection).
- No content strings scattered in JSX — all copy lives in `config/app.ts`.
- No hardcoded hex colors in components — always use Tailwind tokens mapped from the brand palette.
- Co-locate component styles with the component using Tailwind classes. No separate CSS files per component.

---

## Accessibility

- All interactive elements have accessible labels.
- Focus states are visible and use `--color-blush` outline.
- Color contrast meets WCAG AA on all text/background combinations.
- Images (when added) have descriptive `alt` text.
- The mobile nav must be keyboard-navigable and closable with `Escape`.

---

## Environment Variables

```bash
# .env.example

# App
NEXT_PUBLIC_APP_NAME=""   # Business name — update here if branding changes
NEXT_PUBLIC_APP_URL=""    # e.g. http://localhost:3000
```

```bash
# .env.development

NEXT_PUBLIC_APP_NAME="Fresh Finish"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Definition of Done (This Phase)

This phase is complete when:

1. All three pages (`/`, `/services`, `/book`) render correctly at 375px, 768px, and 1280px viewports.
2. The brand palette is applied consistently — no off-brand colors anywhere.
3. The `Button`, `Badge`, and `Card` primitives are implemented and used throughout (no raw `<button>` or ad-hoc card divs).
4. The Header renders on all pages with a working mobile nav.
5. The Footer renders on all pages.
6. TypeScript compiles with zero errors (`tsc --noEmit`).
7. ESLint passes with zero errors.
8. `config/app.ts` is the single source of truth for all content — no hardcoded strings in JSX.
9. No backend dependencies are installed.

---

## Out of Scope (Future Phases)

Do not implement any of the following in this phase. They are tracked here for future build phases.

### Phase 2 — Booking Flow
- Booking form submission and validation (Zod).
- Availability calendar with real date logic (block past dates, Sundays, etc.).
- `POST /api/bookings` API route.
- Prisma 7.8.0+ + PostgreSQL 18+ setup, Docker Compose, dev setup script (`scripts/dev-setup.mjs`).
- Multi-step wizard behavior (currently all steps visible simultaneously for layout review).
- Package additions: `prisma`, `@prisma/client`, `zod`.

### Phase 3 — Customer Identity & Magic Links
- `Customer` and `MagicLinkToken` database models.
- `/my-bookings` pages (email request form + authenticated booking history).
- Customer-facing booking cancellation (24-hour cutoff).
- `POST /api/magic-link/request` and `GET /api/magic-link/verify` routes.
- `PATCH /api/bookings/[id]/cancel` customer-facing route.
- `lib/magic-link.ts` token generation and verification.
- New env vars: `MAGIC_LINK_SECRET`.

### Phase 4 — Admin Dashboard
- Password-protected `/admin` route via Next.js middleware.
- Booking management table with status updates.
- Blocked dates management.
- Admin session cookie auth (`lib/admin-auth.ts`).
- New env vars: `ADMIN_PASSWORD`, `ADMIN_COOKIE_SECRET`.

### Phase 5 — Email & Notifications
- Transactional email via Resend.
- Customer booking confirmation email with magic link.
- Magic link request email.
- Owner notification emails on new bookings.
- Automated appointment reminder emails (24hr before).
- SMS notifications (Twilio or similar).
- Package additions: `resend`, `@react-email/components`.
- New env vars: `RESEND_API_KEY`, `EMAIL_FROM`.

### Phase 6 — Payments & Account Verification
- Stripe deposit payment at booking time.
- Deposit-gated customer account activation as an anti-spam mechanism.
- Refund logic for cancellations.
- Package additions: `stripe`, `@stripe/stripe-js`.

### Phase 7 — Operations & Growth
- Multi-staff / technician scheduling and assignment.
- Service add-ons and upsells at booking time.
- Reviews and ratings system (post-appointment prompt).
- Owner analytics dashboard (revenue, booking trends, popular services).
- Customer-facing rescheduling (currently cancellation only).