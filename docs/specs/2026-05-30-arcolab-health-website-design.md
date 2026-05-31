# Arcolab Health — Website Design Spec

**Date:** 2026-05-30
**Status:** Approved
**Type:** Marketing landing page (single page, static)

## Purpose

A short, professional landing page for **Arcolab Health**, a healthtech company
working with primary care clinics to empower physicians with AI and modern
technology. The product is early-stage and intentionally undefined, so the site
keeps the product **vague** while establishing **trust, professionalism, and a
modern/techy feel**. Primary goal: get interested clinics/physicians to **contact**
the company.

## Constraints & Decisions

| Decision | Choice |
|----------|--------|
| Build | Single static `index.html` + `styles.css` — no build step |
| Hosting target | Any static host (Netlify / Vercel / GitHub Pages) |
| Scope | Single scrolling page |
| Primary CTA | "Contact" → links to a Google Form (placeholder URL) |
| Contact email | `arcolabhealth@gmail.com` (mailto fallback) |
| Fonts | Inter (text) + JetBrains Mono (labels) via Google Fonts CDN |
| Visual direction | "Clinical Calm" — light, soft blue→teal gradients, whitespace, subtle techy mono accents |

## Brand DNA (carried from curaemr & form-filler)

- Primary blue: `hsl(215 65% 42%)`
- Teal accent: `hsl(175 55% 40%)`
- Background: near-white `hsl(210 20% 98%)`, foreground `hsl(215 25% 12%)`
- Soft shadows, hairline borders (`hsl(214 20% 88%)`), rounded corners (~0.625rem)
- Mono uppercase eyebrow labels = the "techy" signal

## Page Structure

1. **Header** — sticky, minimal. Wordmark "Arcolab Health" (left), single "Contact" button (right).
2. **Hero** — mono eyebrow label, large headline ("Modern care, built for clinics." — editable placeholder), one-line subhead about empowering primary care physicians with AI + modern tech, primary **Contact** button. One soft gradient orb accent.
3. **What we do** — 3 deliberately vague value cards, each with mono index (01/02/03), short title, one line. Becomes 3-up grid on desktop.
4. **Who it's for** — short band naming primary care clinics & physicians, framed as design partners.
5. **Our approach / values** — trust blurb: clinician-first, privacy-conscious, Canadian. 2–3 compact points.
6. **Contact CTA** — closing section: headline + Contact button (Google Form) + `arcolabhealth@gmail.com` mailto fallback.
7. **Footer** — wordmark, email, "© 2026 Arcolab Health".

## Contact Wiring

- All "Contact" buttons point to a placeholder `GOOGLE_FORM_URL_HERE` (clearly marked for swap).
- `arcolabhealth@gmail.com` appears as a `mailto:` fallback in the closing section and footer.

## Quality Requirements

- **Responsive:** mobile-first single column → multi-column on desktop.
- **Accessible:** semantic HTML5, sufficient color contrast, visible focus states, `prefers-reduced-motion` respected for any animation.
- **Performance:** no framework, minimal CSS, fonts the only external request.

## Out of Scope (YAGNI)

- Specific product features, screenshots, or pricing
- Team / about / blog pages
- Analytics, cookie banner, tracking
- Backend, forms beyond the linked Google Form
