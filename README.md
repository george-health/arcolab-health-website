# Arcolab Health — Website

A short, static landing page for **Arcolab Health** — a healthtech company
empowering primary care physicians with AI and modern technology.

## Stack

Plain **static HTML + CSS** — no build step, no dependencies. Fonts (Inter +
JetBrains Mono) load from Google Fonts. Design carries the brand DNA (deep
medical blue + teal) from the `curaemr` and `form-filler` projects.

```
index.html        single page (header, hero, what-we-do, who-it's-for, approach, contact, footer)
styles.css        all styling (CSS variables, "Clinical Calm" theme)
assets/favicon.svg "Sunrise" mark — gradient dome rising over a horizon
docs/specs/       design spec
```

## Run locally

Just open the file, or serve it:

```sh
open index.html
# or
python3 -m http.server 8000   # → http://localhost:8000
```

## Before going live — TODO

1. ~~Contact link~~ — done: all "Contact" buttons link to
   `https://forms.gle/kkwiCuYe9bMiqfRy8` (header, hero, contact section).
2. Confirm the contact email `arcolabhealth@gmail.com` is correct.
3. (Optional) Tweak the headline / copy — all text is intentionally vague about
   the product, per the early-stage brief.

## Deploy

Drop the folder on any static host — Netlify, Vercel, GitHub Pages, or Cloudflare
Pages. No configuration needed.
