# SpexSol — Solutions & Concepts Website Implementation Plan

> **Purpose:** Give this document to a coding agent working in the existing SpexSol website repository. Implement **website content and presentation only**, not the underlying applications. Keep this document updated as tasks are completed.

## Objective

Position SpexSol as a practical software and automation partner by explaining familiar operational problems (paperwork, chat messages, spreadsheets, disconnected systems) and proposing credible digital solutions. Convert relevant visitors into B2B discovery calls. Target international buyers; write public-facing content in professional English.

## Non-negotiable rules

- **Do not build any of the proposed SaaS/MVP applications.** This task is limited to the SpexSol marketing website.
- **Do not present concepts as delivered client projects.** Label every example clearly as **Solution Concept / Proposed Workflow / Planned MVP**. Never invent clients, testimonials, adoption, savings, integrations, screenshots of working software, or performance claims.
- Inspect the existing codebase, framework, routes, content structure, styles, and SEO setup first. Reuse its design system, typography, components, navigation, and conventions.
- Keep the website fast, accessible, responsive, and crawlable. Prefer server-rendered or statically generated content where supported by the existing stack.
- Do not publish fabricated company details, contact addresses, external profiles, or credentials. Use verified existing data or request owner input.
- Keep content specific, concise, and useful; avoid keyword stuffing or exaggerated AI claims.
- Do not deploy or alter production infrastructure without authorization.
- Update checkboxes and the execution log in this file after each work session; report blocked items rather than guessing.

## Step 0 — Repository discovery and baseline

- [ ] Identify framework, router, deployment target, styling and content conventions.
- [ ] Inspect current homepage, services, portfolio/work, navigation, footer and contact CTA.
- [ ] Identify current SEO patterns (titles, descriptions, canonicals, sitemap, schema) and avoid conflicts with existing SEO plan.
- [ ] Record baseline screenshots / route inventory and any broken links or accessibility issues.
- [ ] Decide final URL structure consistent with the existing website; default to `/solutions` and `/solutions/{slug}`.

## Information architecture

Add a navigation entry **Solutions** linking to `/solutions` and create the following concept pages:

1. `/solutions/field-service-automation` — **FieldFlow**
2. `/solutions/invoice-processing` — **InvoiceFlow**
3. `/solutions/quote-automation` — **QuoteFlow**
4. `/solutions/shift-reporting` — **ShiftFlow**
5. `/solutions/inventory-management` — **StockFlow**
6. `/solutions/maintenance-requests` — **FixFlow**

All six should appear as cards on `/solutions`. Prioritize full editorial depth for FieldFlow, InvoiceFlow, and QuoteFlow; the remaining three can use the same reusable template with shorter but complete content. Link to existing service pages where relevant. If an existing FieldFlow concept page already exists, **update/reuse it rather than creating a duplicate**; preserve any existing inbound URL via canonical or redirect where appropriate.

## Shared content requirements

Each concept page must contain:

1. Hero: recognizable operational pain point, short value proposition, and prominent **Solution Concept** label.
2. **The challenge**: concrete, relatable day-to-day process with the employees involved.
3. **Current workflow**: 3–5 manual steps.
4. **Proposed workflow**: 4–6 steps from input to human review and output.
5. **Potential business benefits**: qualified statements (e.g., *could reduce repetitive data entry*) without invented statistics.
6. **Human oversight and exceptions**: AI extraction requires validation; explain where approvals and error handling fit.
7. **Who it's for**: relevant business types.
8. **Related services / concepts**: meaningful internal links.
9. CTA: **“Have a similar workflow? Let's discuss it.”** leading to the existing contact flow.
10. Visible disclosure: **“Concept illustration — not a deployed client solution.”**

Use clean workflow visuals built with existing UI components/CSS/SVG; do not depict a functioning product interface as real. If using mockups, label them **Illustrative UI Concept**.

## Concept briefs and suggested website copy

### 1. FieldFlow — Field Service Report Automation

**Audience:** Field service, installation, inspections, maintenance companies.

**Hero:** “From field report photos to organized, reviewable workflows.”

**Problem:** Technicians photograph completed paper service reports and send them via messaging apps or email. Coordinators must identify jobs, read handwriting, enter data, chase missing information, and forward documents.

**Proposed workflow:** Technician uploads report photo → document extraction/OCR + AI parsing → job matching and field validation → coordinator reviews uncertain fields → approved PDF/export/email handoff.

**Potential value:** Less repetitive transcription, clearer status tracking, more consistent records, faster handoffs.

**Important constraint:** Never imply direct Messenger/WhatsApp integration exists; present integrations as possible future options subject to platform access and consent.

### 2. InvoiceFlow — Invoice Intake & Approval

**Audience:** Finance teams, accountants, SMEs, multi-location operations.

**Hero:** “Turn scattered invoices into a consistent approval process.”

**Problem:** Supplier invoices arrive across inboxes and attachments; employees manually extract totals, vendors, due dates and cost centers, then route approvals.

**Proposed workflow:** Receive/upload invoice → extract key fields → check duplicates and missing data → assign approval owner → human approval → export to accounting software.

**Potential value:** More consistent intake, fewer copy/paste tasks, better audit trail and visibility into pending approvals.

**Important constraint:** Accounting system integrations, tax correctness, and fraud detection are proposed capabilities, not guaranteed outcomes.

### 3. QuoteFlow — B2B Quotation Automation

**Audience:** Manufacturers, installers, B2B sales teams, technical service providers.

**Hero:** “Build consistent proposals without rebuilding spreadsheets.”

**Problem:** Salespeople copy line items between spreadsheets, manually apply pricing and margin rules, and struggle to track versions and approvals.

**Proposed workflow:** Select customer and quote template → add catalog items/configuration → apply approved pricing rules → request manager approval for exceptions → generate versioned PDF → track proposal status.

**Potential value:** Faster quote preparation, fewer formula mistakes, consistent approvals and traceable revisions.

**Important constraint:** Do not claim the tool integrates with any specific CRM/ERP unless verified.

### 4. ShiftFlow — Timesheets & Shift Reporting

**Audience:** Construction, logistics, production, field teams.

**Hero:** “Replace chat-based timesheets with a reviewable reporting flow.”

**Problem:** Employees submit hours via messages and managers consolidate month-end spreadsheets.

**Proposed workflow:** Mobile timesheet submission → job/shift association → supervisor review → exception resolution → payroll-ready export.

**Potential value:** Fewer missing entries and less month-end reconciliation.

### 5. StockFlow — Lightweight Inventory Visibility

**Audience:** Warehouses, distributors, small retail and e-commerce teams.

**Hero:** “Make stock movements easier to capture and verify.”

**Problem:** Inventory changes are tracked in separate spreadsheets and are difficult to reconcile.

**Proposed workflow:** Scan item/QR code → record stock movement → validate quantity/location → update shared view → notify on configurable thresholds.

**Potential value:** More timely visibility, traceable adjustments and fewer manual handoffs.

### 6. FixFlow — Maintenance Request Coordination

**Audience:** Property managers, facility teams, multi-site operators.

**Hero:** “From scattered maintenance messages to accountable requests.”

**Problem:** Requests arrive by calls and emails; coordinators lack a reliable overview of ownership and resolution.

**Proposed workflow:** Submit issue with photo → classify and prioritize → assign technician → track updates → review completion and close request.

**Potential value:** Clearer ownership, searchable history, fewer missed follow-ups.

## `/solutions` landing page

**Eyebrow:** SPEXSOL / SOLUTIONS

**H1:** “Your business runs on processes. We make them work better.”

**Intro:** “Explore practical ways to turn paperwork, spreadsheets, and disconnected communication into clearer digital workflows. These are solution concepts that illustrate how SpexSol approaches real operational challenges.”

- [ ] Display all six concepts as accessible, responsive cards with problem-first summaries and **Solution Concept** labels.
- [ ] Include filters/categories only if they meaningfully improve navigation; avoid unnecessary client-side complexity.
- [ ] Provide links to relevant real SpexSol services and a clear contact CTA.
- [ ] Distinguish concepts from verified portfolio/client case studies throughout navigation and structured data.

## Conversion page: `/automation-assessment` (or integrate into existing contact page)

**H1:** “What could we automate in your business?”

**Intro:** “Tell us about a repetitive process, spreadsheet, or manual handoff. We'll explore whether a focused software solution could simplify it.”

- [ ] Add a short form using the website's existing validated form infrastructure, if available.
- [ ] Fields: work email, company (optional), process description, current tools (optional), approximate monthly volume (optional), consent/required privacy acknowledgement where applicable.
- [ ] Include clear success, error, loading, anti-spam, and accessible validation states.
- [ ] Never claim submissions are delivered unless the backend/integration is actually wired and tested.
- [ ] If no working form infrastructure exists, use a verified existing contact route or mailto CTA; mark backend integration as blocked.
- [ ] Avoid collecting unnecessary personal or sensitive information. Follow existing privacy and data retention policies.

## Optional: illustrative automation value calculator

Implement only if consistent with site scope and design. Inputs: monthly document volume, minutes of manual work per document, hourly labor cost, and assumed reduction in manual time. Outputs: hours and nominal labor-time value potentially saved per month.

Formula: `hoursSaved = volume * minutesPerItem / 60 * reductionFraction`; `laborTimeValue = hoursSaved * hourlyCost`.

- [ ] Show all assumptions and allow visitors to adjust them.
- [ ] Label clearly: **“Illustrative scenario, not a measured client result.”**
- [ ] Explain that estimates exclude implementation, subscriptions, human review, exceptions, and operating costs; time saved does not necessarily equal cash savings.
- [ ] Do not invent benchmarks or promise a specific ROI.

## SEO, accessibility, and technical requirements

- [ ] Unique page titles, descriptions, H1s and canonical URLs for each page.
- [ ] Add routes to sitemap if the existing architecture supports it.
- [ ] Add meaningful internal links from services/homepage and between related concepts.
- [ ] Use semantic headings, descriptive links, alt text for meaningful visuals, keyboard navigation, visible focus states and adequate contrast.
- [ ] Make core page content available to crawlers; avoid hiding primary copy behind interactions.
- [ ] Preserve responsive layout and existing performance budgets.
- [ ] Use structured data only for facts that are accurate and supported; do **not** mark conceptual projects as completed customer work or use fabricated reviews.
- [ ] Verify Open Graph/social preview metadata using existing conventions.
- [ ] Avoid unsupported SEO claims or keyword stuffing.

## Suggested delivery order

### Sprint A — Discovery & content foundation
- [ ] Complete repository discovery and route plan.
- [ ] Implement `/solutions` and shared reusable concept-page template.
- [ ] Add FieldFlow, InvoiceFlow and QuoteFlow concept pages.
- [ ] Add navigation, internal links and contact CTAs.

### Sprint B — Complete concept library
- [ ] Add ShiftFlow, StockFlow and FixFlow pages.
- [ ] Add accessible workflow diagrams and clear concept disclaimers.
- [ ] Integrate approved content into homepage or services without displacing existing verified work.

### Sprint C — Lead capture & validation
- [ ] Add `/automation-assessment` or integrate with verified contact flow.
- [ ] Optionally implement the illustrative value calculator.
- [ ] Complete SEO, responsive, accessibility, build and link checks.
- [ ] Produce owner follow-up checklist and report outstanding blockers.

## Definition of done

- All six concepts are discoverable from the Solutions index and clearly labeled as **concepts**.
- First three concepts have detailed, specific, polished pages.
- All page links, metadata and mobile layouts are verified.
- No false client, delivery, testimonial, integration, or ROI claims exist.
- Contact CTA works or its external dependency is explicitly flagged.
- Existing site functionality and design conventions are preserved.
- Build and relevant tests pass; deployment happens only with explicit authorization.
- This file contains an accurate execution log.

## Execution log (agent-maintained)

| Date | Task | Files changed | Verification/evidence | Status / blockers |
| --- | --- | --- | --- | --- |
| — | Not started | — | — | Pending |

## Owner decisions / blockers

- [ ] Confirm whether public branding should use the concept names FieldFlow, InvoiceFlow, QuoteFlow, ShiftFlow, StockFlow, FixFlow.
- [ ] Approve proposed route names and copy.
- [ ] Confirm contact destination and consent wording.
- [ ] Approve any production deployment.

## Agent start prompt

> Read this plan and inspect the existing SpexSol repository. Implement only the **marketing-site Solutions & Concepts** content and supporting pages, not the actual apps. Begin with Sprint A. Follow existing project conventions, preserve truthful concept labeling, verify changes, and keep this Markdown checklist and execution log current. Ask for owner decisions only when genuinely blocked; do not invent business facts.

## Backlog

### [ ] C1 Add five concept case studies (InvoiceFlow, QuoteFlow, ShiftFlow, StockFlow, FixFlow)
- Why: Case studies index shows one concept only, so visitors cannot see breadth of operational problems SpexSol frames; brief above defines five more.
- Scope: Register slugs `invoiceflow`, `quoteflow`, `shiftflow`, `stockflow`, `fixflow` in `src/data/case-studies.ts` with status `concept`. Add full EN and SK copy for each under its slug in `caseStudies.json`, same key shape as `fieldflow` (name, eyebrow, category, tagline, title, intro, cta, spec, challenge, solution, workflow.steps, value, principles, nextSteps). InvoiceFlow and QuoteFlow get full editorial depth; the other three shorter but every key present. Add each page to `public/sitemap.xml` and `public/llms.txt` for both locales. Non-goals: no `/solutions` route, no nav change, no FieldFlow copy change, no new components, no `/automation-assessment`, no calculator, no integration/CRM/ERP/messenger claims, no invented clients, numbers or testimonials.
- Files: `src/data/case-studies.ts`, `src/i18n/locales/en/caseStudies.json`, `src/i18n/locales/sk/caseStudies.json`, `public/sitemap.xml`, `public/llms.txt`.
- Acceptance:
  - [ ] `npm run build` passes with zero TypeScript errors.
  - [ ] `src/data/case-studies.ts` exports six entries; slugs `fieldflow`, `invoiceflow`, `quoteflow`, `shiftflow`, `stockflow`, `fixflow`, all `status: 'concept'`.
  - [ ] Both `en/caseStudies.json` and `sk/caseStudies.json` contain top-level keys for all five new slugs, each with the same key set as `fieldflow` (diff of sorted key paths is empty).
  - [ ] `public/sitemap.xml` contains `/en/case-studies/<slug>` and `/sk/case-studies/<slug>` for all five new slugs; `public/llms.txt` lists all five under Case studies in EN and SK sections, each line containing "concept".
  - [ ] `grep -riE "whatsapp|messenger|sap|pohoda|hubspot|salesforce|%|saves [0-9]" src/i18n/locales/*/caseStudies.json` returns no match in new slug blocks.
  - [ ] DEVICE: `/en/case-studies` renders six cards, each showing status label "Concept / Planned MVP".
  - [ ] DEVICE: `/en/case-studies/invoiceflow` and `/sk/case-studies/quoteflow` render hero, challenge, solution, workflow steps, value, principles, next steps sections and CTA linking to contact; no raw i18n key visible.
  - [ ] DEVICE: `/sk/case-studies/fixflow` renders Slovak copy, not EN text.
- Plan: docs/plans/C1.md   (added by the architect)

### [ ] C2 Solutions framing on case studies index
- Why: `/case-studies` index has generic title and subtitle; brief wants problem-first positioning, concept disclosure and contact CTA so index works as the Solutions landing.
- Scope: Replace `pageTitle` and `pageSubtitle` in `caseStudies.json` (EN + SK) with brief H1 "Your business runs on processes. We make them work better." and intro copy; add `eyebrow` ("Solutions"), `disclosure` ("Concept illustration — not a deployed client solution.") and `indexCta` keys. Index route renders eyebrow above title, disclosure line under card list, and a contact CTA link to `/$lang/contact` using existing `Button`/link styles. Non-goals: no `/solutions` route or redirect, no nav change, no filters or categories, no new components, no card changes.
- Files: `src/routes/$lang/case-studies/index.tsx`, `src/i18n/locales/en/caseStudies.json`, `src/i18n/locales/sk/caseStudies.json`.
- Acceptance:
  - [ ] `npm run build` passes with zero TypeScript errors.
  - [ ] Both `en/caseStudies.json` and `sk/caseStudies.json` contain keys `eyebrow`, `disclosure`, `indexCta`; EN `pageTitle` equals "Your business runs on processes. We make them work better."
  - [ ] `src/routes/$lang/case-studies/index.tsx` contains one `<Link to="/$lang/contact">`.
  - [ ] DEVICE: `/en/case-studies` shows eyebrow, H1, intro, card list, disclosure line and contact CTA; CTA navigates to `/en/contact`.
  - [ ] DEVICE: `/sk/case-studies` shows Slovak copy, no raw i18n key.

### [ ] C3 Automation assessment page
- Why: Brief defines conversion page "What could we automate in your business?"; today only generic contact page exists, so concept visitors get no process-focused entry point.
- Scope: New route `/$lang/automation-assessment` rendering `PageHeader` (brief H1 + intro) and existing `ContactSection` with topic preselected to `automation` (add optional `defaultTopic` prop to `ContactForm` and `ContactSection`; initial `useState` uses it). Add `assessment.*` keys (pageTitle, pageSubtitle, meta.title, meta.description) to `contact.json` EN + SK. Add page to `public/sitemap.xml` and `public/llms.txt` both locales. Non-goals: no new form fields, no schema or Slack change, no nav entry, no change to concept page CTA, no anti-spam beyond existing honeypot.
- Files: `src/routes/$lang/automation-assessment.tsx`, `src/components/site/ContactForm.tsx`, `src/components/site/ContactSection.tsx`, `src/i18n/locales/en/contact.json`, `src/i18n/locales/sk/contact.json`, `public/sitemap.xml`, `public/llms.txt`.
- Acceptance:
  - [ ] `npm run build` passes with zero TypeScript errors.
  - [ ] `src/components/site/ContactForm.tsx` exports `ContactForm` accepting `defaultTopic?: ContactTopic`; `src/routes/$lang/automation-assessment.tsx` passes `defaultTopic="automation"`.
  - [ ] Both `contact.json` files contain `assessment.pageTitle`, `assessment.pageSubtitle`, `assessment.meta.title`, `assessment.meta.description`; EN `assessment.pageTitle` equals "What could we automate in your business?"
  - [ ] `public/sitemap.xml` contains `/en/automation-assessment` and `/sk/automation-assessment`; `public/llms.txt` lists page in EN and SK sections.
  - [ ] DEVICE: `/en/automation-assessment` renders H1, intro and contact form with topic "Automation" preselected; submit with valid data shows existing success toast.
  - [ ] DEVICE: `/en/contact` still preselects topic "Product" (default unchanged).

### [~] C4 Homepage work section cap and concept framing
- Why: Home "Products & case studies" section lists every case study; after C1 six concept cards push Offer and FAQ below fold and verified products lose prominence.
- Scope: In home route, render products first, then at most 3 case studies (`caseStudies.slice(0, 3)`); add `work.subtitle` key (EN + SK) in `home.json` stating case studies are solution concepts, not delivered client work, rendered under section head. Non-goals: no card changes, no new components, no products change, no ordering logic in data file.
- Files: `src/routes/$lang/index.tsx`, `src/i18n/locales/en/home.json`, `src/i18n/locales/sk/home.json`.
- Acceptance:
  - [ ] `npm run build` passes with zero TypeScript errors.
  - [ ] `src/routes/$lang/index.tsx` contains `caseStudies.slice(0, 3)`; both `home.json` files contain `work.subtitle`.
  - [ ] DEVICE: `/en` work section shows all products, then 3 case study cards, subtitle mentioning "concept", and "All case studies" link.
  - [ ] DEVICE: `/sk` work section subtitle is Slovak.

### [ ] C5 Illustrative automation value calculator
- Why: Brief asks for optional calculator so visitors can reason about potential time saved with visible, adjustable assumptions and explicit "not a measured result" label.
- Scope: Pure function `estimateSavings({ volume, minutesPerItem, hourlyCost, reductionFraction })` returning `{ hoursSaved, laborTimeValue }` in `src/lib/value-calculator.ts` with `node --test`-runnable check file `src/lib/value-calculator.test.ts`. Client component `src/components/case-studies/ValueCalculator.tsx` using native `<input type="number">` via existing `Input`/`Label`, four inputs with defaults (100, 10, 30, 0.5), live outputs, label "Illustrative scenario, not a measured client result." and assumptions note (excludes implementation, subscriptions, human review, exceptions, operating costs; time saved does not equal cash savings). Render once on `/case-studies` index below card list. Keys under `calculator.*` in `caseStudies.json` EN + SK. Non-goals: no currency conversion, no persistence, no analytics event, no charts, no new dependency, no per-concept placement.
- Files: `src/lib/value-calculator.ts`, `src/lib/value-calculator.test.ts`, `src/components/case-studies/ValueCalculator.tsx`, `src/routes/$lang/case-studies/index.tsx`, `src/i18n/locales/en/caseStudies.json`, `src/i18n/locales/sk/caseStudies.json`.
- Acceptance:
  - [ ] `npm run build` passes with zero TypeScript errors.
  - [ ] `node --test --experimental-strip-types src/lib/value-calculator.test.ts` passes; test asserts volume 100, 10 min, 30/h, 0.5 gives hoursSaved ≈ 8.33 and laborTimeValue 250.
  - [ ] Both `caseStudies.json` files contain `calculator.title`, `calculator.disclaimer`, `calculator.assumptions`, `calculator.inputs.volume`, `calculator.inputs.minutesPerItem`, `calculator.inputs.hourlyCost`, `calculator.inputs.reduction`, `calculator.outputs.hours`, `calculator.outputs.value`; EN `calculator.disclaimer` equals "Illustrative scenario, not a measured client result."
  - [ ] `grep -riE "roi|benchmark|guarantee" src/components/case-studies/ValueCalculator.tsx src/i18n/locales/*/caseStudies.json` returns no match in calculator keys.
  - [ ] DEVICE: `/en/case-studies` calculator with defaults shows 8.3 h and 250; changing volume to 200 updates outputs without reload; all inputs have visible labels and keyboard focus.
  - [ ] DEVICE: `/sk/case-studies` calculator labels Slovak.
