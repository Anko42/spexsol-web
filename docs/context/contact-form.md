# Contact form

## Purpose
The single interactive feature of the site. Lets visitors reach Spexsol; also serves as the contact channel referenced from the iOS apps' App Store listings and from the privacy policy.

## Fields (planned)
- `name` — required, 1–120 chars
- `email` — required, valid email
- `message` — required, 10–4000 chars
- (optional) honeypot field for basic spam protection

## Validation
Zod schema shared between `components/ContactForm.tsx` and `routes/api/contact.ts`. Client renders inline errors; server re-validates and returns 400 on failure.

## Delivery
**Not yet decided.** Options on the table: Resend, SMTP (Nodemailer), Formspree-style forwarder, or DB persistence. Until the user picks one, `routes/api/contact.ts` should:
- Validate input
- Log the submission server-side
- Return `{ ok: true }` with a `// TODO: wire delivery` marker

Wiring delivery should be a single-file change.

## Spam / abuse — to revisit
- Honeypot field
- Rate limiting per IP
- Optional Turnstile/hCaptcha if abuse appears
