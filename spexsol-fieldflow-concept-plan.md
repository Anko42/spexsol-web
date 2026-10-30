# SpexSol Website — FieldFlow Concept Case Study

## Goal
Publish a compelling, honest **concept case study** on the existing SpexSol website. **Do not build the FieldFlow application, backend, AI integration, or MVP in this task.** This is a website/content implementation only.

The concept demonstrates SpexSol's ability to identify operational inefficiencies and propose practical software and AI-assisted workflows. It must never imply a delivered client project, a deployed product, or measured results.

## Agent operating instructions
1. Inspect the repository, routing, current portfolio/work pages, styling system, SEO utilities, and localization before editing.
2. Follow existing conventions and reuse existing components. Do not introduce a new framework or unnecessary dependencies.
3. Implement the page and a portfolio/project teaser linking to it. If the site uses a different route convention, follow that convention; otherwise use `/work/fieldflow`.
4. Make the copy professional, clear, and **English-first** for international B2B prospects. Respect existing localization if applicable.
5. Use the exact status label **Concept / Planned MVP** in a prominent place.
6. No fabricated client, testimonials, performance metrics, screenshots of a working app, production claims, or misleading CTAs.
7. Update the checklist and implementation log in this file as you work. Mark only verified items complete.
8. Run available lint/typecheck/build checks, and record their results. Do not deploy without authorization.

## Page positioning
- **Working title:** FieldFlow — From Field Photos to Structured Service Reports
- **Category:** Workflow Automation · AI-assisted Document Processing
- **Status:** Concept / Planned MVP
- **Audience:** Field service operators, maintenance teams, operations managers, coordinators.
- **Purpose:** Demonstrate problem framing, solution design, and implementation capabilities, and encourage relevant B2B inquiries.
- **Important:** This is a SpexSol-developed *concept*, not a client engagement.

## Suggested website copy (adapt to site voice, keep meaning)

### Hero
**Eyebrow:** SpexSol Concept / Planned MVP

**H1:** FieldFlow — Turning Field Service Paperwork into Structured Workflows

**Intro:** Field technicians often share photos of completed service reports through messaging apps. Coordinators then spend time interpreting, organizing, and forwarding those documents manually. FieldFlow is a proposed AI-assisted workflow that would turn those scattered photos into structured, reviewable records.

**CTA:** Discuss a Similar Workflow (link to existing contact route or contact form)

### The challenge
**Heading:** Important service data gets stuck in chat threads

**Body:** After a site visit, a technician may photograph a paper protocol and send it through a messaging app. A coordinator must identify the job, read the document, re-enter key details, check for missing information, and forward it to the right recipient. The process depends on manual handoffs and makes tracking, retrieval, and consistency harder as the volume of reports grows.

### Proposed solution
**Heading:** One place to capture, review, and route field reports

**Body:** FieldFlow explores a mobile-friendly submission flow and a coordinator workspace. An AI document-processing step would suggest structured fields from uploaded photos. A human reviewer would confirm or correct those fields before generating a clean report and preparing it for delivery. The design keeps people in control of final approval.

### Workflow (4 stages)
1. **Capture:** A technician uploads one or more photos of a completed service protocol.
2. **Extract:** AI-assisted processing proposes key fields such as job reference, date, customer, work performed, and notes.
3. **Review:** A coordinator checks the source image alongside the extracted information and corrects anything uncertain.
4. **Prepare & send:** Once approved, the workflow prepares a standardized PDF or structured export for authorized delivery.

### Potential business value
**Heading:** Designed to reduce repetitive coordination work

- Less manual transcription and repetitive forwarding.
- More consistent report structure and easier retrieval.
- Clearer review and approval responsibilities.
- Better visibility into outstanding or incomplete reports.

**Disclaimer:** These are expected benefits of the proposed workflow, not validated results. No performance measurements are available yet.

### Product thinking / design principles
**Heading:** Practical automation with human oversight

- Mobile-first submission for technicians in the field.
- Explicit human validation before external delivery.
- Visibility into missing or low-confidence information.
- Traceability from the original image to the final report.
- Data protection and access controls as requirements for any future implementation.

### Status and next steps
**Heading:** A concept today, a potential MVP next

**Body:** FieldFlow is currently a solution concept. A future proof-of-concept implementation could validate document extraction accuracy, review time, and coordinator usability using synthetic or properly authorized sample documents. No production deployment or customer results are claimed.

### Closing CTA
**Heading:** Have a similar manual workflow in your business?

**Body:** SpexSol helps teams explore how custom software and AI-assisted processes could simplify operational work. Let's discuss the problem and identify a realistic first step.

**CTA:** Talk to SpexSol (existing contact route)

## Design requirements
- Match the existing SpexSol visual identity, typography, spacing, and navigation.
- Create a polished case-study layout with readable sections, clear hierarchy, and a four-step workflow graphic made from existing UI primitives or CSS/SVG.
- A conceptual illustration is optional. If used, label it **Concept illustration** and avoid making it appear to be a screenshot of a functioning product.
- Ensure responsive mobile and desktop layouts and accessible headings, contrast, and focus states.
- Avoid generic stock imagery if it weakens credibility.
- Add a concise project card to the existing work/portfolio section, with the visible status **Concept / Planned MVP**.

## SEO requirements
- Unique document title, e.g. `FieldFlow — AI-Assisted Field Service Workflow Concept | SpexSol`.
- Meta description: `Explore FieldFlow, a SpexSol concept for turning photographed field service reports into structured, human-reviewed workflows with AI-assisted extraction.`
- Canonical URL matching the implemented public route.
- One descriptive H1 and semantic heading hierarchy.
- Relevant internal links to SpexSol services and contact pages where they exist.
- Include the page in the site's sitemap if generated by the current architecture.
- Do not mark this as a completed customer case study in structured data. Do not invent reviews, ratings, or results.
- Open Graph metadata should accurately describe a **concept**.

## Scope boundaries
### In scope
- Public concept case-study page.
- Portfolio/work card and navigation to the page.
- Responsive layout, accessible UI, basic SEO metadata.
- Honest concept-focused copy.

### Out of scope
- FieldFlow app or demo functionality.
- Uploads, OCR, AI APIs, database, authentication, PDF generation, email delivery.
- Customer dashboards or fake interactive product demos.
- Paid integrations, external profile creation, deployment.

## Acceptance criteria / checklist
- [x] Repository structure, existing work pages, and site conventions inspected.
- [x] Public FieldFlow concept page added using existing routing conventions.
- [x] Concept / Planned MVP status visible above the fold.
- [x] All major content sections implemented with truthful wording.
- [x] Four-stage proposed workflow clearly illustrated.
- [x] Potential benefits explicitly identified as unvalidated.
- [x] Portfolio card added and linked to the concept page.
- [x] CTA points to a real existing contact route.
- [x] Responsive and accessibility basics checked.
- [x] Title, description, canonical, OG metadata and sitemap handled where supported.
- [x] No FieldFlow application/backend/AI code introduced.
- [x] Available lint/typecheck/build checks run and recorded.

## Implementation log
> Coding agent: append date, files changed, decisions, test results, and remaining blockers here. Do not claim completion until verified.

- **2026-10-30** — Implemented on `main` (uncommitted).
  - Route convention: site uses `/$lang/...` with en/sk, so page lives at `/$lang/case-studies/fieldflow` with a listing at `/$lang/case-studies` (user decision; `/work/fieldflow` not used).
  - New: `src/routes/$lang/case-studies/index.tsx`, `src/routes/$lang/case-studies/$slug.tsx`, `src/data/case-studies.ts`, `src/components/case-studies/{CaseStudyCard,WorkflowSteps,ConceptIllustration}.tsx`, `src/i18n/locales/{en,sk}/caseStudies.json`.
  - Changed: `src/i18n/config.ts` (new `caseStudies` namespace), `src/components/site/SiteHeader.tsx` (nav item "Case studies"), `src/routes/$lang/index.tsx` (home block renamed "Products & case studies", renders case-study cards, link to `/case-studies`), `common.json`/`home.json` strings, `public/sitemap.xml` (4 URLs), `src/routeTree.gen.ts` (generated).
  - Status label "Concept / Planned MVP" shown in hero eyebrow, spec list, and on every card. SK: "Koncept / Plánované MVP".
  - Copy is EN + SK. SK is a translation by the agent; owner review recommended.
  - SEO via existing `pageHead`: unique title/description per locale, canonical, hreflang, OG. No structured data added (none of type CaseStudy/Review).
  - CTAs link to existing `/$lang/contact` route. Closing CTA reuses `ContactLegalCTA`.
  - Concept illustration is schematic HTML/CSS (three panels), captioned "Concept illustration". No screenshots.
  - No FieldFlow application, backend, or AI code added.
  - Checks: `npm run build` (vite build + tsc) exit 0. Production server smoke test: `/en/case-studies`, `/en/case-studies/fieldflow`, `/sk/case-studies/fieldflow` return 200 with correct title/canonical/H1; unknown slug returns 404.
  - Not done: visual/browser QA, git commit, deploy. Responsive/a11y verified by code review only (semantic headings, `aria-labelledby`, focusable links, decorative SVG `aria-hidden`).
  - Note: a `vite dev` server left running since before the change does not pick up the new i18n namespace (init guarded by `isInitialized`); restart it.
