# Pricing: how to build a price

Internal only. Nothing here goes on the site. All numbers ex VAT.

The site promises "no hourly rates". That is true for the client. Internally you still count days, because days are the only honest input. The client sees the output: one monthly number or one fixed number.

## 1. Rate card

| Item | Internal rate | Notes |
|---|---|---|
| Base day rate | 400 € | One focused day of you plus agents. Used for fixed-price work. |
| Monthly stream | 2 500–3 500 € / month | Roughly 8–10 days a month on one client. Discounted vs day rate because it is predictable revenue. |
| Second stream, same client | +2 000–2 800 € / month | Only if you really have the capacity. Two streams for one client is your whole month. |
| Audit / discovery week | 500–1 500 € | 2–4 days at a reduced rate. It is a sales tool, not profit. |
| Maintenance retainer | 300–600 € / month | After launch. Covers updates, monitoring, small fixes up to ~1 day a month. |
| Rush (needed in under two weeks) | +30 % | Say it out loud. Rush is a feature, charge for it. |

Floor: never go under 2 000 €/month for a stream or 300 €/day for fixed work. Below that, say no and refer them.

## 2. Monthly partnership

Three questions decide the number:

1. How many days a month does the list need? (Estimate from the month-one list, see section 4.)
2. How much of your week is already sold?
3. How much pain did they quantify on the call?

| Days per month | Price |
|---|---|
| 6–8 | 2 500 € |
| 8–10 | 3 000 € |
| 10–12 | 3 500 € |
| more than 12 | Say "this is two streams". Split it, or push items to "later". |

Rules:

- Price goes **up** with their quantified pain, never down with their stated budget. If the budget is too small, shrink the list.
- First month is the written list. Measure yourself against it. If you under-deliver, do not discount, over-deliver in month two.
- Pause is free. Restart is free. A stream that has been paused more than two months starts again with a new written list.

## 3. Fixed-price project

Only for a **closed** list. If the list is open, do the audit first.

```
price = estimated days × 400 € × risk factor
```

| Risk factor | When |
|---|---|
| 1.2 | Clear scope, known stack, you have done this before |
| 1.4 | New integration, third-party API, payments, or client data you have not seen |
| 1.6 | Prototype rescue, legacy code, "we also need Android" conversations |

Round up to the nearest 500 €. Then sanity-check: would you be happy doing this for that number if it takes 30 % longer? If not, raise it.

Payment: 40 % to start, 40 % at the first usable version, 20 % at handover. Never 100 % at the end.

Included in every fixed price: one month of support after launch, repo and accounts in their name. Not included: hosting, AI model usage, App Store fees. Say so in the quote.

## 4. Estimating days from the written list

Do this in private, after the call, never live.

| Item type | Days (one engineer plus agents) |
|---|---|
| Auth, roles, basic settings | 1–2 |
| One CRUD screen (list, detail, form) | 0.5–1 |
| One integration (API with docs you have read) | 1–3 |
| Payments (Stripe or similar) | 2–3 |
| Data import from their spreadsheet | 1–2 |
| Reporting or export | 1–2 |
| iOS app shell, TestFlight, App Store submission | 2–3 |
| Push notifications, camera, offline | 1–2 each |
| AI feature with evaluation and monitoring | 2–5 |
| Design (when no designer) | 15 % of the build days |
| Testing, deployment, docs, handover | 20 % of the build days |

Add design and handover on top. Then add the risk factor from section 3. Keep the sheet; it gets better every project.

## 5. MVP packages (founders)

Pre-shaped so the call goes faster. Still quote from the list; these are starting points.

| Package | Scope | Days | Fixed price |
|---|---|---|---|
| Small | 3 features, web or iOS, no payments | 10–12 | 4 500–5 500 € |
| Standard | 5 features, web + iOS, payments or one integration | 16–20 | 7 000–9 000 € |
| Rescue | Harden an existing Lovable / Cursor prototype to production | 8–15 | 3 500–6 500 € |

If the founder cannot name the first paying customer, offer the audit instead of a package.

## 6. Audit / discovery week

| Days | Price | What they get |
|---|---|---|
| 2 | 500–700 € | Written list for month one, in/out table, recommended model |
| 3–4 | 1 000–1 500 € | Same plus a clickable prototype or a technical spike on the riskiest part |

Credit: if they sign a stream or fixed project within 30 days, deduct 50 % of the audit from the first invoice. Say this on the call, it makes the audit an easy yes.

## 7. Worked examples

**Owner, spreadsheet replacement.** List: auth (1.5), 3 CRUD screens (2.5), spreadsheet import (1.5), one report (1.5) = 7 days. Design 15 % (1), handover 20 % (1.5) = 9.5 days. Scope clear, risk 1.2 → 11.4 days × 400 € = 4 560 €, rounded 5 000 €. Or: one stream at 3 000 €/month, done in month one with room for changes. Offer monthly if they said "we'll want more once we see it".

**Founder, Standard MVP.** List: auth (2), 4 screens (3), Stripe (3), iOS shell + store (3) = 11 days. Design (1.5), handover (2) = 14.5 days. Payments → risk 1.4 → 20 days × 400 € = 8 120 €, rounded 8 500 €. Timeline 6–7 weeks. Payment 40/40/20.

**Team, backlog.** No fixed list, priorities will move. Stream at 3 500 €/month, 10–12 days. Say "two streams" if they list more than 12 days of work for month one.

## 8. Quote template

One page. Nothing in it the client has not already heard on the call.

```
SpexSol s.r.o. — Quote / Cenová ponuka
Client:
Date:                       Valid until: (14 days)

Goal (client's words):

Month one / Scope (each line with "how you'll check it"):
1.
2.
3.

Explicitly later:

Model:   [ ] Monthly partnership   [ ] Fixed-price project   [ ] Audit week
Price:   ... € / month ex VAT   |   ... € ex VAT (40 / 40 / 20)
Includes: weekly delivery, repo and accounts in client's name, one month support after launch
Excludes: hosting, AI model usage, App Store fees
Start:                      First usable version:

Andrej Skalický, skalicky@spexsol.sk
```

## 9. Reviewing the number before you send it

- Did they hear this number on the call? If not, do not send it. Call first.
- Is it above the floor? If not, say no.
- Does the list have 3–5 items with a check for each? If not, it is not a list yet.
- Would you still be glad at 130 % of the estimate? If not, raise the risk factor.
- Is "later" written down? Clients forget what they agreed to push out.
