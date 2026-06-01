# KnowLaw – Smart Legal Assistant for Egyptian Law

A bilingual (Arabic/English) legal-tech SaaS web app that provides AI-powered legal information for Egyptian law. Features include an AI chatbot, document analysis, contract generation, document translation, a lawyer directory, and a secure legal vault.

## Run & Operate

- `pnpm --filter @workspace/knowlaw run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS + Wouter (routing) + shadcn/ui
- API: Express 5 (health check only — app uses all mock data)
- No database — all data is mock/hardcoded state

## Where things live

- `artifacts/knowlaw/src/` — React frontend
- `artifacts/knowlaw/src/context/AppContext.tsx` — global language/auth state
- `artifacts/knowlaw/src/components/Navbar.tsx` — top navigation
- `artifacts/knowlaw/src/components/Footer.tsx` — disclaimer footer
- `artifacts/knowlaw/src/pages/` — all page components
- `artifacts/api-server/src/` — Express backend (health check only)

## Architecture decisions

- All data is mock/hardcoded — no real backend or database needed
- RTL/LTR support via AppContext language toggle + dir="rtl" on HTML element
- Google Fonts "Cairo" for Arabic, "Inter" for English — must be first @import in index.css
- Navy (#0F2044) / Gold (#C9A84C) color palette applied via CSS custom properties
- Wouter used for routing (not react-router-dom)

## Product

KnowLaw has 10 pages:
1. **Landing** (/) — hero, features, how it works, stats, testimonials
2. **Register** (/register) — with residency + role selectors
3. **Login** (/login)
4. **Dashboard** (/dashboard) — quick actions, recent cases, vault, chat history
5. **Chat** (/chat) — AI legal chatbot with citations and typing indicator
6. **Analyze** (/analyze) — document OCR + risk assessment
7. **Contracts** (/contracts) — 3-step contract generator
8. **Translate** (/translate) — document + quick text translation
9. **Lawyers** (/lawyers) — directory with search/filter + booking modal
10. **Vault** (/vault) — document storage + cases dashboard
11. **Admin** (/admin) — user management + system health

## User preferences

- Color palette: Deep navy (#0F2044) + Gold/Amber (#C9A84C) + white + light gray
- Bilingual: English (LTR) and Arabic (RTL) with language toggle in navbar
- All AI interactions simulated with mock data and loading indicators
- No emojis in UI text (except specific icons: 🇪🇬, 📖, 🔒 in specified places)

## Gotchas

- Google Fonts @import MUST be the VERY FIRST line of index.css — PostCSS fails silently otherwise
- All CSS custom properties must be set (none can remain as "red")
- Use wouter's `<Switch>` and `<Route>` for routing — not react-router-dom
- RTL: apply dir="rtl" to the HTML element, not just a wrapper div
- The knowlaw workflow must be restarted after the design subagent finishes

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
