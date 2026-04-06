# Legal pages

## Why they exist
1. **iOS App Store submissions** — Spexsol's iOS apps require a public privacy policy URL (and terms of use for certain features). These pages provide those URLs.
2. **Contact form** — the privacy policy describes how contact-form submissions are handled.

## Pages
- `/$lang/privacy-policy`
- `/$lang/terms-of-use`

## Format
Hardcoded TSX, one component per page, content inlined per locale (en + sk). No MDX, no CMS — keeps the build trivial and the content reviewable in PRs.

## Update process
1. Edit the TSX file directly for the relevant locale.
2. Bump a "Last updated" date shown at the top of the page.
3. If a change is material (data handling, retention, contact channel), notify users per the policy's own update clause and re-submit affected iOS apps if their listing references changed sections.

## Cross-references to keep in sync
- Contact email / channel mentioned in privacy policy must match what `ContactForm` actually does.
- Company legal name and address must match across both pages and the iOS App Store listing.
