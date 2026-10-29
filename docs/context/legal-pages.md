# Legal pages

## Why they exist
1. **iOS App Store submissions** — Spexsol's iOS apps require a public privacy policy URL (and terms of use for certain features). These pages provide those URLs.
2. **Contact form** — the privacy policy describes how contact-form submissions are handled.

## Pages
- `/$lang/privacy-policy`
- `/$lang/terms-of-use`

## Format
Content lives in `src/i18n/locales/{en,sk}/legal.json` (namespace `legal`). Routes in `src/routes/$lang/` stay thin and only map keys onto `LegalSection` / `NumberedList`. No MDX, no CMS — keeps the build trivial and the content reviewable in PRs.

## Update process
1. Edit `legal.json` in **both** locales; keep key sets identical (new section = new key in en + sk, renumber headings).
2. Bump `lastUpdated` in both locales (shown at the top of the page).
3. If a change is material (data handling, retention, contact channel), notify users per the policy's own update clause and re-submit affected iOS apps if their listing references changed sections.

## Cross-references to keep in sync
- Contact email / channel mentioned in privacy policy must match what `ContactForm` actually does.
- Company legal name and address must match across both pages and the iOS App Store listing.

## Adding an app
Privacy policy is one page for all apps. Shared sections stay generic; app-specific text lives under `privacy.apps.<appKey>` in both `legal.json` files:
- `name` — display name (used as sub-heading in sections 2 and 6)
- `collectionIntro` — what stays on device, what leaves it
- `collectionItems` — numbered list of data that leaves the device (`"01"`, `"02"`, …)
- `retention` — array of app-specific retention paragraphs (may be empty)

Route `src/routes/$lang/privacy-policy.tsx` loops over `privacy.apps`; no code change needed. Add new third parties to `privacy.sections.thirdParties.providers` and name the app in the item. Terms of use are app-agnostic ("some of our applications"); add a section only for genuinely new behaviour.
