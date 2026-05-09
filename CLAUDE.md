# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
bun run dev        # dev server (webpack mode, not Turbopack)
bun run build      # production build
bun run lint       # eslint
```

No test suite configured.

## Stack

- **Next.js 16.2.5** with App Router — breaking changes vs earlier versions; check `node_modules/next/dist/docs/` before writing Next.js code
- **React 19** — new APIs available (use, actions, etc.)
- **Tailwind CSS v4** — config via `@theme` in CSS, not `tailwind.config.js`; PostCSS plugin is `@tailwindcss/postcss`
- **TypeScript 5**, **lucide-react** for icons
- Package manager: **bun** (bun.lock present); scripts use `next dev --webpack`

## Architecture

Single-page app at `app/page.tsx` — one article view for Dubai South off-plan property market.

**Layout pattern:** Three-column CSS grid (`.toc-rail` | `.article-column` | `.content-rail`) on desktop, single-column on mobile. Layout classes defined in `app/globals.css`.

**Responsive strategy:** `isDesktop` state (`window.innerWidth >= 1024`) in `page.tsx` drives conditional class names. Mobile = overlays slide up; desktop = overlays dock as side panels via `.is-desktop-docked` CSS class.

State managed in `page.tsx`:
- `isAiOpen` / `aiMessage` — controls `ChatOverlay`
- `handleOpenAi(message)` — passed down as prop to trigger AI chat with optional pre-filled message

Component structure (`app/components/`):
- `Navbar` — search (via `SearchOverlay`) + hamburger (via `Sidebar`) + desktop nav tabs
- `ChatOverlay` — AI chat panel; mock responses only; accepts `isForcedOpen` for desktop docked mode
- `PersonalisedRecommendations` — links to `/recommendations` dedicated page
- `AiBar` — floating bottom bar (mobile) to open chat
- `ArticleSection1`–`ArticleSection7` — static article content sections
- All components are `"use client"` — no server components in use

**CSS approach:** Mix of Tailwind utility classes and custom CSS classes in `globals.css`. Responsive overrides use `@media (min-width: 1024px)` blocks targeting named CSS classes (not Tailwind breakpoints).
