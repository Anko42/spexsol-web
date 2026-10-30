# SpexSol SEO & AI Discoverability Implementation Plan

> **Purpose:** This file is an executable backlog for a coding agent working in the SpexSol website repository. Inspect the actual codebase and deployment configuration, implement what is feasible in code, and record evidence. Do not assume an earlier external audit proved that the site is offline or not indexed.
>
> **Website:** https://spexsol.sk  
> **Company:** SpexSol s. r. o.  
> **Status:** Not started  
> **Last updated:** 2026-10-30

## Agent operating instructions

1. Inspect the repository before changing anything. Identify framework, routing, hosting, rendering strategy (SPA/SSR/SSG), SEO tooling, build commands, and deployment configuration.
2. Work through the tasks in priority order. Make small, reviewable changes, preserve the existing design and behavior, and avoid introducing unnecessary dependencies.
3. Update this file as you work: check completed boxes, add evidence (file paths, commands, output, URLs), and mark blocked tasks with the reason and the required human action.
4. Never claim Google indexing, production accessibility, LinkedIn existence, Clutch registration, or AI recommendations are verified without independent evidence. `site:` searches are not definitive indexing diagnostics.
5. Do not fabricate client testimonials, case studies, company addresses, team biographies, credentials, review scores, or social links. Use verified data or leave a clearly marked placeholder.
6. Before changing DNS, production infrastructure, robots policy, canonical host, or externally managed accounts, document the intended change and request approval if access or authorization is unclear.
7. Run existing lint, typecheck, tests, and build commands after changes; document results. Avoid breaking routes, metadata, analytics, or accessibility.
8. At the end, summarize changes, tests, deployment dependencies, and outstanding manual tasks in the Progress Log.

## 1. Audit baseline (unverified findings)

| Area | Previous observation | Priority | Verification required |
| --- | --- | --- | --- |
| Google indexing | No results observed for `site:spexsol.sk` | P0 Critical | Verify in Google Search Console (URL Inspection / Pages report) |
| Website availability | External fetch failed | P0 Critical | Check DNS, TLS, HTTP from independent environments and production logs |
| `robots.txt` | Could not verify | P1 High | Inspect repository and live response |
| `sitemap.xml` | Could not verify | P1 High | Inspect repository and live response |
| Company identity | Public mention of SpexSol s. r. o. | P1 High | Confirm legal details with owner and authoritative register |
| LinkedIn | Company profile not confirmed | P2 High | Owner to provide verified URL or create profile |
| B2B directories | Clutch profile not confirmed | P2 High | Owner to verify or create listing |
| AI recommendations | Insufficient independently verified evidence of services | P2 High | Review public content and test discoverability without promising rankings |

**Interpretation:** These are leads for investigation, not confirmed defects. A failed external fetch may be caused by tool/network limitations. `site:` results alone cannot establish whether pages are indexed.

## 2. Discovery and baseline

- [ ] Identify app framework, package manager, router, deployment target, rendering mode, and existing SEO setup.
- [ ] Inventory public routes, page titles, descriptions, canonical URLs, and heading structure.
- [ ] Determine whether meaningful page content is visible in initial HTML to non-JavaScript crawlers; if SPA-only, propose and implement suitable prerendering/SSG/SSR where compatible with the architecture.
- [ ] Run and record baseline `lint`, `typecheck`, `test`, and `build` (only commands supported by the repo).
- [ ] Record current production behavior, where reachable: `dig spexsol.sk A +short`, `dig spexsol.sk NS +short`, `curl -IL https://spexsol.sk`, `curl -IL https://www.spexsol.sk`.
- [ ] Record baseline page performance and accessibility with available tooling (e.g., Lighthouse) if environment permits.

**Evidence / notes:** _Pending_

## 3. P0 — Accessibility, crawlability, indexability

- [ ] Investigate DNS, TLS certificate, redirect chains, HTTP status, and production deployment. Do not edit DNS without owner approval.
- [ ] Confirm preferred canonical origin (`https://spexsol.sk` unless owner specifies otherwise); implement safe redirects for HTTP and alternate hostname if infrastructure supports them.
- [ ] Ensure public pages return HTTP 200, not an application shell with a misleading 200 for missing routes; missing pages should return 404.
- [ ] Ensure production public pages are not blocked by `noindex`, `X-Robots-Tag`, authentication, or accidental robots directives.
- [ ] Implement or fix `/robots.txt`, permitting indexing of intended public pages and referencing the absolute sitemap URL. Block only genuinely private routes.
- [ ] Implement or fix `/sitemap.xml`, with absolute canonical HTTPS URLs for real, indexable pages. Generate from the route inventory/build where practical; exclude private, duplicate, or 404 pages.
- [ ] Set one canonical URL per indexable page; avoid canonicalizing all routes to the homepage.
- [ ] Validate the production-served HTML and HTTP responses after deployment, not just local source files.

**Acceptance criteria:** Intended pages are publicly fetchable, canonical and indexable; `robots.txt` and `sitemap.xml` return HTTP 200 with valid content; missing pages return 404; redirects have no loops.

**Evidence / notes:** _Pending_

## 4. P1 — On-page and technical SEO

- [ ] Give each indexable page a unique, descriptive `<title>`, meta description, and single meaningful H1.
- [ ] Add Open Graph and Twitter/X preview metadata with valid absolute image URLs (use an existing approved asset).
- [ ] Implement page-specific structured data: `Organization` (or a more appropriate subtype), `WebSite`, `BreadcrumbList` where applicable, and `Service` only for genuinely offered services.
- [ ] Populate structured data with **verified** legal name, canonical URL, logo, and `sameAs` links; do not invent company contact information or profiles.
- [ ] Verify accessible navigation, descriptive links, alt text, semantic landmarks, and mobile responsiveness.
- [ ] Review Core Web Vitals: LCP, CLS, INP; optimize assets, fonts, caching, and code splitting without regressing UX.
- [ ] Verify language metadata (`lang="en"` if English-first), and use `hreflang` only if actual localized variants exist.
- [ ] Check for broken links, duplicate routes, incorrect redirects, and accidental staging-domain indexing.

**Acceptance criteria:** Every public indexable route has coherent page-specific metadata and valid structured data; the production build passes; no fabricated schema properties.

**Evidence / notes:** _Pending_

## 5. P1 — Information architecture and conversion

**Proposed routes — create only if content is accurate and approved; adapt to the existing routing conventions:**

| Proposed route | Search intent | Content requirement |
| --- | --- | --- |
| `/` | Software development partner | Clear positioning, services, credibility, CTA |
| `/services/react-development` | React development services | Real capabilities, process, deliverables |
| `/services/mobile-app-development` | Mobile / React Native development | Actual platforms and delivery experience |
| `/services/web-app-development` | Custom web applications | Real stack and use cases |
| `/services/dedicated-developers` | Dedicated developers | Accurate engagement model |
| `/services/software-outsourcing` | Software outsourcing in Europe | Scope, collaboration model, contact CTA |
| `/case-studies` | Verified delivery experience | Only approved real projects |
| `/about` | Company credibility | Verified legal identity and team details |
| `/contact` | Business inquiry | Functional contact method and privacy handling |

- [ ] Confirm with owner which services SpexSol actually offers; remove unsupported proposals.
- [ ] Create or improve service pages with useful, differentiated content rather than thin keyword pages.
- [ ] Add clear CTAs (contact form or verified email) and ensure submissions are tested.
- [ ] Link related services and case studies with descriptive anchor text.
- [ ] Ensure privacy notice and consent requirements are respected if tracking or forms are added.
- [ ] Do not publish invented customer logos, metrics, projects, or testimonials.

**Acceptance criteria:** All added pages contain useful, approved content, are linked from navigation, and appear in the sitemap when indexable.

**Evidence / notes:** _Pending_

## 6. P2 — AI discoverability and trust signals

- [ ] Make core service descriptions, company identity, and contact details accessible in server-delivered HTML or a compatible prerendered output.
- [ ] Keep business name, domain, and verified contact details consistent across the site and structured data.
- [ ] Add approved case studies with concrete problem, approach, technologies, and results (only with client permission).
- [ ] Add approved team expertise and links to authentic professional profiles where appropriate.
- [ ] Check crawler access policies for search and AI discovery; document any privacy/IP tradeoffs before changing bot rules.
- [ ] Evaluate whether an `llms.txt` file is useful as an optional supplement; do not treat it as an indexing or citation guarantee.
- [ ] Prepare a repeatable manual evaluation: ask multiple AI search products to find SpexSol and to identify its services; record date, exact prompt, citation/URL, accuracy, and whether it was recommended.

**Acceptance criteria:** Public, factual, crawlable descriptions of the business exist; any AI visibility claims are backed by reproducible observations.

**Evidence / notes:** _Pending_

## 7. External accounts and listings — owner action required

These tasks cannot be completed through repository changes alone.

- [ ] **Google Search Console:** owner verifies domain property, submits sitemap, and checks URL Inspection / indexing reports.
- [ ] **Google/Bing:** verify branded search results after deployment; allow time for recrawling and avoid guaranteeing a timeframe.
- [ ] **LinkedIn:** owner confirms or creates official company page and provides URL for `sameAs`.
- [ ] **Clutch / B2B directories:** owner confirms or creates profiles with consistent, accurate details and authentic references.
- [ ] **Legal identity:** owner confirms official company name, registration number, business address, and permitted public contact details.
- [ ] **Content approvals:** owner supplies actual case studies, service claims, client permissions, and logos.

**Evidence / notes:** _Pending_

## 8. Suggested implementation sequence

### Sprint 1 — Technical foundations
- [ ] Finish repository discovery and baseline.
- [ ] Resolve verified production accessibility/indexability defects.
- [ ] Implement robots, sitemap, canonicals, and basic metadata.
- [ ] Build, test, deploy (if authorized), and validate live URLs.

### Sprint 2 — Content and structured data
- [ ] Implement approved service page architecture and navigation.
- [ ] Add validated Organization / Service schema and social previews.
- [ ] Improve rendering for crawlers where needed.
- [ ] Review performance and accessibility.

### Sprint 3 — Credibility and measurement
- [ ] Integrate approved case studies and trust signals.
- [ ] Connect verified external profiles.
- [ ] Produce owner instructions for Search Console and directory submissions.
- [ ] Document measurable baseline and follow-up metrics.

## 9. KPIs and verification

| KPI | Baseline | Target / success condition | Evidence source |
| --- | --- | --- | --- |
| Public homepage HTTP response | Unknown | 200 over HTTPS | `curl` / monitoring |
| Robots and sitemap | Unknown | Valid, HTTP 200 | Live URL checks |
| Canonical and metadata coverage | Unknown | 100% of intended indexable routes | Route audit / tests |
| Google indexed pages | Unverified | Eligible key pages indexed, subject to Google | Search Console |
| Structured data validity | Unknown | No blocking validation errors | Validator / Rich Results Test where applicable |
| Core Web Vitals | Unknown | Improvement from baseline | Lighthouse / field data |
| Verified case studies | Unknown | 2 if owner supplies real approved examples | Published pages |
| Verified external company profiles | Unknown | 3–5 relevant, authentic listings | Public URLs |
| Organic search visibility | Unknown | Measurable growth from baseline | Search Console |
| Qualified inbound leads | Unknown | Track real inquiries; no guaranteed volume | CRM / analytics |

## 10. Completion checklist

- [ ] Changed files and design decisions documented.
- [ ] Build / lint / typecheck / tests run; failures documented.
- [ ] Public routes, canonical tags, sitemap, and robots validated.
- [ ] No unverified business claims or invented references published.
- [ ] Deployment and external-account actions clearly handed off.
- [ ] This `plan.md` updated with checked tasks and a dated Progress Log entry.

## Progress Log

### 2026-10-30 — Initial plan created
- Converted the previous external visibility observations into a verification-first coding backlog.
- No repository inspection, code changes, live verification, or Search Console checks have yet been performed.
- **Next action:** Coding agent should inspect the repository and fill in the baseline before implementing fixes.
