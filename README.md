# Mobile Detailing UI Shell

Mobile-first Next.js (App Router) UI shell for a premium mobile auto detailing business. This repo is intentionally backend-free: no database, no auth, no API calls.

Business name + branding are configurable. Do not hardcode them in UI.

## Tech Stack

- Node.js: 24.13.0+
- Next.js: 16.2.6+ (App Router)
- TypeScript: strict
- Tailwind CSS v3 (semantic brand tokens)
- Testing: Vitest + React Testing Library, Playwright (e2e)

## Quick Start

1. Install deps:
   - `npm ci`
2. Create env file:
   - Copy `.env.example` -> `.env.development`
   - Set:
     - `NEXT_PUBLIC_APP_NAME`
     - `NEXT_PUBLIC_APP_URL` (usually `http://localhost:3000` locally)
3. Run dev server:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Unit tests: `npm test`
- E2E browser install: `npx playwright install`
- E2E tests: `npm run test:e2e`
- Vitest UI: `npm run test:ui`
- Coverage: `npm run test:coverage`
- Playwright UI: `npm run test:e2e:ui`
- Playwright report: `npm run test:e2e:report`

Run `npx playwright install` once before the first local e2e run, or after Playwright version upgrades.

Note for Windows PowerShell: if `npm`/`npx` scripts are blocked, use `npm.cmd` / `npx.cmd`.

## Where Things Live

- Routes:
  - `app/page.tsx` (`/`)
  - `app/services/page.tsx` (`/services`)
  - `app/book/page.tsx` (`/book`)
- Primary content/config:
  - `config/app.ts`
- Layout:
  - `components/layout/Header.tsx`
  - `components/layout/Nav.tsx` (mobile drawer)
  - `components/layout/Footer.tsx`
- UI primitives (use these instead of ad-hoc elements):
  - `components/ui/Button.tsx`
  - `components/ui/Badge.tsx`
  - `components/ui/Card.tsx`
- Styles/tokens:
  - `styles/globals.css` (CSS variables like `--color-primary`, reduced motion, transitions)
  - `tailwind.config.ts` (semantic colors: `primary/secondary/accent/highlight/text`)

## Branding Rules (Important)

- Never hardcode the business/app name in components or metadata.
- Use `NEXT_PUBLIC_APP_NAME` and/or `config/app.ts`.
- No hardcoded hex colors in components. Use semantic Tailwind colors and tokens.

## CI

GitHub Actions:
- On PRs: `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test`
- On pushes to `main`: Playwright e2e runs (`npm run test:e2e`)

## Deployment

This repo is deployable on any platform that can run a standard Next.js production server.

- Native Node.js deploy: build with `npm run build`, start with `npm run start`.
- Container deploy: use the provided `Dockerfile`.

Environment variables required at runtime:
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`

### Docker

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
