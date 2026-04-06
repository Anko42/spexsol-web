# Architecture

## Overview
TanStack Start app with file-based routing under `src/routes`. SSR is on by default. Tailwind v4 is loaded via `src/styles/app.css`.

## Route map
```
/                          → redirect to /{defaultLang}
/$lang                     → locale layout (validates lang ∈ {en, sk})
/$lang/                    → landing page (hero + ContactForm)
/$lang/privacy-policy      → legal, hardcoded TSX
/$lang/terms-of-use        → legal, hardcoded TSX
/api/contact               → POST handler for contact form
```

## Locale layout
`$lang.tsx` is the layout route. It:
1. Validates the `lang` param against the supported locales list (`src/lib/locale.ts`).
2. Sets the active i18n language for the request/render.
3. Renders shared `Header` (with language switcher) and `Footer`.

## Shared shell
- `components/Header.tsx` — logo, nav (only legal links), language switcher
- `components/Footer.tsx` — copyright, legal links, contact link

## Figma → code
Figma frames map to components in `src/components/`. Route files compose those components and keep layout-only logic. This makes it easy for the Figma MCP to overwrite/refresh a single component without disturbing routing.
