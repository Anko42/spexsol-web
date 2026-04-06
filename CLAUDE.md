# Spexsol Web

Marketing site for **Spexsol**. Single purpose: a landing page with a contact form, plus `/privacy-policy` and `/terms-of-use` subpages required for iOS App Store submissions and to back the contact form.

## Stack
- TanStack Start (file-based routing, SSR)
- React 19
- Tailwind CSS v4
- TypeScript
- Zod (validation)
- react-i18next (planned) — locales: **en**, **sk**, with `/en` and `/sk` URL prefixes

## Routes (target)
- `/` → redirect to detected/default locale
- `/$lang` → landing + contact form
- `/$lang/privacy-policy` → hardcoded TSX legal content per locale
- `/$lang/terms-of-use` → hardcoded TSX legal content per locale
- `/api/contact` → POST endpoint for contact submissions (delivery TBD)

## Design workflow
Designs are authored in **Figma** and translated to code via the **Figma MCP**. Keep components small and route files thin so Figma frames map cleanly onto code.

## Dev
- `npm run dev` — start dev server
- `npm run build` — build + typecheck
- `npm run start` — run production server

## Context docs
See `docs/context/` for architecture, i18n, contact form, and legal-pages notes.

## Notes for Claude
- The repo started from the TanStack Start basic example; example routes (posts, users, deferred, pathless layouts) are scheduled for removal.
- Legal content lives **hardcoded in TSX** per locale (not MDX).
- Contact form delivery mechanism is **not yet decided** — the API route should remain a clearly-marked stub until the user picks SMTP/Resend/Formspree/DB.
