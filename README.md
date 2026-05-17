# Mobile Detailing App

Mobile-first Next.js (App Router) application for a premium mobile auto detailing business. The public experience is still marketing-first, and the codebase now includes a backend foundation for admin authentication with Prisma, Postgres, and seeded admin credentials.

Business name + branding are configurable. Do not hardcode them in UI.

## Tech Stack

- Node.js: 24.13.0+
- Next.js: 16.2.6+ (App Router)
- TypeScript: strict
- Tailwind CSS v3 (semantic brand tokens)
- Prisma + Postgres for admin auth persistence
- Auth.js credentials flow for admin access
- Testing: Vitest + React Testing Library, Playwright (e2e)

## Quick Start

1. Install deps:
   - `npm ci`
2. Create env file:
   - Copy `.env.example` -> `.env.development`
   - Set:
      - `NEXT_PUBLIC_APP_NAME`
      - `NEXT_PUBLIC_APP_URL` (usually `http://localhost:3000` locally)
      - `DATABASE_URL`
      - `AUTH_SECRET`
      - `ADMIN_EMAIL`
      - `ADMIN_PASSWORD`
3. Start local Postgres:
   - `docker compose up -d`
4. Generate Prisma client:
   - `npm run prisma:generate`
5. Apply local migrations:
   - `npm run prisma:migrate:dev`
6. Seed the bootstrap admin:
   - `npm run prisma:seed`
7. Run dev server:
   - `npm run dev`
8. Open:
   - `http://localhost:3000`

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`
- Start local Postgres: `docker compose up -d`
- Stop local Postgres: `docker compose down`
- Stop local Postgres and remove data: `docker compose down -v`
- Prisma generate: `npm run prisma:generate`
- Prisma migrate (dev): `npm run prisma:migrate:dev`
- Prisma migrate (deploy): `npm run prisma:migrate:deploy`
- Prisma seed: `npm run prisma:seed`
- Prisma Studio: `npm run prisma:studio`
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
  - `app/layout.tsx` (minimal root layout shared by all routes)
  - `app/(marketing)/layout.tsx` (marketing shell with `Header` and `Footer`)
  - `app/(marketing)/page.tsx` (`/`)
  - `app/(marketing)/services/page.tsx` (`/services`)
  - `app/(marketing)/book/page.tsx` (`/book`)
  - `app/(admin-public)/admin/login/page.tsx` (`/admin/login`)
  - `app/(admin-protected)/admin/page.tsx` (`/admin`)
  - `app/api/auth/[...nextauth]/route.ts` (Auth.js route handler)
- Primary content/config:
  - `config/app.ts`
- Database/auth foundation:
  - `prisma/schema.prisma`
  - `prisma/seed.ts`
  - `lib/prisma.ts`
  - `auth.ts`
  - `lib/auth/`
  - `docker-compose.yml`
- Layout:
  - `components/layout/Header.tsx`
  - `components/layout/Nav.tsx` (mobile drawer)
  - `components/layout/Footer.tsx`
- Admin UI:
  - `components/admin/AdminLoginForm.tsx`
  - `components/admin/AdminSignOutButton.tsx`
- UI primitives (use these instead of ad-hoc elements):
  - `components/ui/Button.tsx`
  - `components/ui/Badge.tsx`
  - `components/ui/Card.tsx`
- Tests:
  - `tests/unit/auth/authorize.spec.ts`
  - `tests/e2e/admin-auth.spec.ts`
- Styles/tokens:
  - `styles/globals.css` (CSS variables like `--color-primary`, reduced motion, transitions)
  - `tailwind.config.ts` (semantic colors: `primary/secondary/accent/highlight/text`)

## Branding Rules (Important)

- Never hardcode the business/app name in components or metadata.
- Use `NEXT_PUBLIC_APP_NAME` and/or `config/app.ts`.
- No hardcoded hex colors in components. Use semantic Tailwind colors and tokens.

## Admin Auth Foundation

- Admin authentication uses Prisma, Postgres, and Auth.js credentials.
- The current credentials flow uses Auth.js JWT sessions while Prisma remains the source of truth for admin users.
- Bootstrap admin access is created through `npm run prisma:seed` using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- `/admin/login` is implemented and uses the Auth.js credentials flow.
- `/admin` is implemented as a protected admin route.
- The current admin dashboard is a mock shell that marks the next operational tools to build.

## Current Status

- Implemented:
  - public marketing pages for `/`, `/services`, and `/book`
  - Prisma + PostgreSQL local development foundation
  - seeded bootstrap admin credentials
  - Auth.js credentials login with JWT sessions
  - protected admin shell at `/admin`
- Still mocked:
  - booking submission and persistence
  - customer-facing workflows
  - admin operations panels beyond the shell
- Next likely phase:
  - database-backed admin tools for services, bookings, customers, or scheduling

## Local Database

- Local development uses `docker-compose.yml` to run PostgreSQL 18 on `localhost:5432`.
- The Next.js app and Prisma CLI still run on the host machine in this phase.
- Default local credentials match `.env.example`:
  - database: `mobile_detail`
  - user: `postgres`
  - password: `postgres`

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
- `DATABASE_URL`
- `AUTH_SECRET`

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
  -e DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5432/mobile_detail" \
  -e AUTH_SECRET="<generated secret>" \
  mobile-detail
```

Local Postgres for development:

```bash
docker compose up -d
docker compose down
```
