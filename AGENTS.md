<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from common training data.

Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mobile Detailing App — Agent Directive

This file is the authoritative specification for AI agents (opencode or otherwise) working in this repository. Follow every section precisely.

## Project Overview

This repository is a mobile-first web application template for a premium mobile auto detailing business.

The business name and branding are intentionally treated as variables.

Rules:
1. Never hardcode the business/app name directly in UI or metadata.
2. Reference it exclusively via `NEXT_PUBLIC_APP_NAME` and/or `config/app.ts`.

This repository is currently a marketing-first application with an incremental backend rollout.

Current architecture rules:
1. Public marketing pages remain mostly static.
2. Admin authentication is allowed and expected.
3. Postgres via Prisma is allowed for admin identity and sessions.
4. Auth.js route handlers are allowed for admin auth.
5. Booking and customer workflows remain mocked until explicitly implemented.

## Tech Stack

Minimums:
1. Node.js: 24.13.0+
2. Next.js: 16.2.6+ (App Router)
3. TypeScript: strict mode
4. Tailwind CSS: v3
5. Linting: ESLint + Prettier
6. Unit/Component testing: Vitest + React Testing Library
7. E2E testing: Playwright

Version pins: do not install versions below those minimums. If the package manager suggests lower versions, override in `package.json`.

## Non-Goals

Do not install or configure out-of-scope backend dependencies:
1. Customer-facing auth providers beyond the planned admin Auth.js flow
2. Email providers (Resend, etc.)
3. Payments (Stripe, etc.)
4. Booking/customer API routes unrelated to admin auth

## Brand & Design System

### Name and Palette Are Changeable

The name and palette are expected to change per business. Code must use semantic tokens so rebranding is a value swap, not a rewrite.

### Color Tokens

Define semantic CSS custom properties in `styles/globals.css` and keep the semantic Tailwind tokens in `tailwind.config.ts` aligned with them.

Rules:
1. No hardcoded hex values in components.
2. Use Tailwind semantic colors (`primary`, `secondary`, `accent`, `highlight`, `text`) and component variants.
3. If a one-off color is needed, add a semantic token first.

Semantic tokens (names are stable; values are expected to change):

```css
--color-primary
--color-secondary
--color-accent
--color-highlight
--color-text

/* Derived/supporting tokens (still avoid hex in components). */
--color-highlight-hover
--color-danger
```

Tailwind mapping (keep names stable):

```ts
colors: {
  primary: '<hex>',
  secondary: '<hex>',
  accent: '<hex>',
  highlight: '<hex>',
  text: '<hex>',
}
```

### Typography Scale

Font: Inter (use `next/font/google`, no `<link>` tag).

Use this scale for primary headings, body copy, labels, and captions. Compact utility text for nav, metadata, and dense controls is acceptable when it improves usability:
1. `display` 56px/3.5rem, 700, lh 1.1
2. `h1` 40px/2.5rem, 700, lh 1.2
3. `h2` 30px/1.875rem, 700, lh 1.3
4. `h3` 22px/1.375rem, 700, lh 1.4
5. `body-lg` 18px/1.125rem, 400, lh 1.6
6. `body` 16px/1rem, 400, lh 1.6
7. `label` 14px/0.875rem, 500, lh 1.4
8. `caption` 12px/0.75rem, 400, lh 1.4

On mobile:
1. `display` scales down to 40px
2. `h1` scales down to 30px

### Spacing & Shape

1. Border radius: 12px for cards/containers, 8px for inputs/buttons/badges
2. Page max-width: 1280px centered
3. Section padding: 64px vertical desktop, 40px mobile
4. Card padding: 24px

### Elevation

Use named shadows only:

```ts
boxShadow: {
  raised: '0 4px 24px rgba(0, 0, 0, 0.3)',
  overlay: '0 8px 40px rgba(0, 0, 0, 0.5)',
}
```

### Motion and Interaction

Interactive elements must implement: default, hover, active (pressed), focus, disabled.

Global transition standard (via CSS or Tailwind utilities):
1. properties: background-color, border-color, color, box-shadow, transform, opacity
2. duration: 150ms default, 200ms for larger elements, never above 300ms

Reduced motion is required:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Touch Targets

All tappable elements must be at least 48x48px on mobile.

### Mobile Nav Drawer

Requirements:
1. Slides in from the right (`translateX(100%)` -> `translateX(0)`).
2. Backdrop overlay fades in behind the drawer.
3. Closes on backdrop tap, nav link tap, or Escape.
4. Uses `shadow-overlay`.

## Repository Structure

```text
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── services/page.tsx
│   ├── book/page.tsx
│   └── api/auth/[...nextauth]/route.ts
├── components/
│   ├── ui/
│   ├── layout/
│   └── sections/
├── config/app.ts
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── styles/globals.css
├── tests/
│   ├── unit/
│   └── e2e/
├── tailwind.config.ts
└── vitest.config.ts
```

## Central Config (`config/app.ts`)

Primary marketing copy, labels, and nav definitions should live in `config/app.ts`. Keep JSX copy to short structural UI text only when centralizing it would add noise.

Note: any fallback name string is a placeholder and should be treated as such.

## Pages

Routes:
1. `/` homepage
2. `/services` services detail page
3. `/book` booking page (static mock)
4. `/admin` protected admin route (planned)
5. `/admin/login` admin credentials login (planned)

Booking page is UI-only:
1. No submission
2. No validation beyond basic HTML constraints
3. No API calls

Admin auth scope:
1. Email/password login for admins is allowed.
2. Credentials are stored in Postgres via Prisma.
3. Auth.js route handlers may be added under `app/api/auth/`.
4. JWT sessions are allowed for the admin credentials flow when required by Auth.js provider constraints.

## Components

Primitives:
1. `components/ui/Button.tsx`
2. `components/ui/Badge.tsx`
3. `components/ui/Card.tsx`

Layout:
1. `components/layout/Header.tsx`
2. `components/layout/Nav.tsx` (mobile drawer)
3. `components/layout/Footer.tsx`

Rules:
1. Use server components by default.
2. Add `"use client"` only when required (interactivity, browser APIs).
3. Avoid ad-hoc primitives; use `Button`, `Badge`, and `Card`.

## Code Quality Rules

1. TypeScript strict. No `any`.
2. Functional components with explicit prop types (no implicit `React.FC`).
3. No hardcoded hex values in components.
4. Co-locate styles with components using Tailwind classes.

## Documentation Hygiene

- Keep `README.md` accurate. When a change materially affects onboarding or day-to-day workflows, update `README.md` in the same PR.
- Material changes include:
  1. New/changed dev commands (`npm run …`, `npx …`)
  2. Tooling/version changes (Node/Next/TypeScript/Tailwind/Vitest/Playwright)
  3. New required environment variables or updates to `.env.example`
  4. New routes, key directories, or "where things live"
  5. CI behavior changes (required checks, e2e policy)
  6. Deployment workflow changes (platform steps, build/start commands, env vars)

## Accessibility

1. All interactive elements must have accessible labels.
2. Visible keyboard focus ring using the semantic highlight token.
3. Color contrast meets WCAG AA.
4. Mobile nav drawer is keyboard navigable and closable with Escape.

## Environment Variables

```bash
# .env.example

# App
NEXT_PUBLIC_APP_NAME=""   # Business name (branding)
NEXT_PUBLIC_APP_URL=""    # e.g. http://localhost:3000

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mobile_detail"

# Auth
AUTH_SECRET=""

# Seeded Admin
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

```bash
# .env.development

NEXT_PUBLIC_APP_NAME="<business name>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mobile_detail"
AUTH_SECRET="<generated secret>"
ADMIN_EMAIL="owner@example.com"
ADMIN_PASSWORD="<strong password>"
```

## Local Dev Commands

```bash
docker compose up -d
docker compose down
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:migrate:deploy
npm run prisma:seed
npm run prisma:studio
npx tsc --noEmit
npm test
npm run test:e2e
```

## CI Policy (GitHub Actions)

Policy:
1. On every Pull Request, required checks must pass:
   - `npm ci`
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm test`
2. On every push to `main` (including PR merges), run Playwright e2e:
   - `npm ci`
   - `npx playwright install --with-deps`
   - `npm run test:e2e`

E2E is intentionally not required on PRs initially (speed + contributor experience). Tighten later if/when the suite remains stable and fast.

## Deployment

This repo is deployable on any platform that can run a standard Next.js production server.

Options:
1. Native Node.js deploy: build with `npm run build`, start with `npm run start`.
2. Container deploy: use the provided `Dockerfile`.

Environment variables required at runtime:
1. `NEXT_PUBLIC_APP_NAME`
2. `NEXT_PUBLIC_APP_URL`
3. `DATABASE_URL`
4. `AUTH_SECRET`

## Docker

This repo includes a multi-stage `Dockerfile` that builds Next.js in `standalone` mode and runs the app with `node server.js`.

For local development, use `docker-compose.yml` to run PostgreSQL 18 on `localhost:5432`. The Next.js app still runs on the host machine during this phase.

Build:
```bash
docker build -t mobile-detail .
```

Run:
```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_APP_NAME="<business name>" \
  -e NEXT_PUBLIC_APP_URL="http://localhost:3000" \
  mobile-detail
```

## Out of Scope (Future Phases)

### Booking Flow

1. Booking form submission and validation.
2. Availability calendar with real date logic.
3. API routes for bookings.

### Customer Identity & Magic Links

1. Customer identity models.
2. Magic link request/verify flow.
3. Customer booking management.

### Admin Dashboard

1. Booking management and blocked dates.
2. Customer management.
3. Service management.

### Email & Notifications

1. Transactional email provider integration.
2. Customer confirmations and reminders.
3. Optional SMS notifications.

### Payments & Account Verification

1. Stripe integration (deposit/payment).
2. Refund/cancellation rules.

### Operations & Growth

1. Multi-staff scheduling.
2. Add-ons and upsells.
3. Reviews/ratings and analytics.
