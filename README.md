# edurodrigues.com.br

The new personal site for Eduardo Rodrigues (voice talent, master of ceremonies, presenter, celebrant, speaker and communication teacher). It replaces the 2021 WordPress site and follows [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md). The scrape of the old site is in [scrape/](scrape/README.md).

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Zod · lucide-react. Every page is prerendered as static HTML. The only server code is the lead-form Server Action.

## Run it

Requires Node ≥ 20.9. On this machine a portable Node 24 LTS is at `C:\tools\node-v24.21.0-win-x64` (add it to `PATH`).

```bash
npm install
cp .env.example .env.local   # optional; every variable is optional in dev
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Where things live

```
src/
  app/                    routes (one folder per page) + sitemap, robots, icons, OG image
    actions/lead.ts       Server Action: Zod validation → honeypot → Turnstile → Resend
  content/                ALL site copy and media references (edit here, not in pages)
    site.ts               name, contact, WhatsApp, social links, nav, stats
    career.ts             bio, education, career history, client segments
    services.ts           the 4 service pages + Palestras card
    talks.ts              talk formats, content pillars, audiences
    courses.ts            courses (online / in person), with draft flag
    demos.ts · videos.ts · gallery.ts · clients.ts · testimonials.ts
  components/
    layout/               header (+ mobile menu), footer, WhatsApp button, GTM + consent banner
    sections/             page building blocks (hero, stats, logo marquee, service cards, FAQ…)
    media/                audio playlist, YouTube facade, gallery + lightbox, portfolio tabs, map facade
    forms/lead-form.tsx   the single form used for quotes, talks and courses
  assets/                 images imported by the content files (optimised by next/image)
public/audio/             the 9 voice demos (MP3)
```

**Editing content.** Change the typed objects in `src/content/*.ts`. TypeScript flags a missing field at build time. To add a photo, put it in `src/assets/images/…` and import it in the content file; `next/image` generates the sizes, AVIF/WebP and blur placeholder.

**Courses are drafts.** Every course in `courses.ts` has `draft: true` because the client hasn't sent real courses yet. Drafts appear in `npm run dev`, or in a preview build with `SHOW_DRAFTS=true`, with a red "Rascunho" banner and `noindex`. In production they 404 and stay out of the sitemap, and `/cursos` shows a "Novas turmas em breve" waitlist form instead. To publish a course, fill in the real data and set `draft: false`. For an online course, also set `checkoutUrl` so the CTA links straight to the course platform.

**Testimonials** stay empty until the client sends real ones; the testimonial sections render only when the array has items.

## Integrations (`.env.local`)

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Loads Google Tag Manager (old container: `GTM-599783W`) with Consent Mode v2 defaulting to *denied*, plus the LGPD cookie banner. Leave it unset in dev/preview. |
| `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` | Emails each lead via Resend. **Without a key:** in dev the lead is only logged to the console; in production the form shows an error and points to WhatsApp. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile anti-spam. Without it, only the honeypot field protects the form. |
| `SHOW_DRAFTS` | `true` shows draft courses in a production build (client previews only). |

Successful submissions push `{ event: "generate_lead", form_variant }` to the dataLayer.

## URLs from the old site

`trailingSlash: true` keeps `/`, `/servicos/` and `/contato/` exactly as before. `next.config.ts` sends 308 permanent redirects for the rest:

| Old | New |
|---|---|
| `/meu-portfolio/` | `/portfolio/` |
| `/eduardo-rodrigues/`, `/clientes/` | `/sobre/` |
| `/corporativo/`, `/formaturas/`, `/festas/`, `/estudio/` | `/portfolio/?tab=fotos&galeria=…` (opens the Photos tab with that filter) |
| `/wp-content/uploads/2021/05/*.mp3` | `/audio/*.mp3` |

The 37 theme demo URLs (`/shop/`, `/team/*`, `/services/*`…) are deliberately left to 404.

## What was checked

- `tsc`, ESLint and `next build` are clean; all 19 routes are static.
- Every old sitemap URL was requested against the production build: kept URLs return 200, renamed ones redirect in one hop, demo leftovers return 404.
- Browser tests in headless Edge (device emulation through the DevTools Protocol):
  - The form flags invalid fields and keeps typed values; a valid submission shows the success state.
  - Demos play and switch tracks; starting a video pauses the audio.
  - The lightbox opens, supports arrow keys and closes.
  - `?tab`/`?galeria` open the right view.
  - The mobile menu works.
  - No page overflows horizontally at 390 px.
  - No console errors.
- The OG image is a static 85 KB JPEG. The generated PNG was 650 KB, too large for WhatsApp link previews.

## Content to confirm with the client (`REVISAR`)

Each item is marked `REVISAR` in the code:

1. **Photoshoot and logo.** Current photos date from 2007–2021. The wordmark (text) and "ER" favicon are placeholders until the vector logo arrives.
2. **Courses.** Real names, syllabus, workload, price, class dates and the checkout platform (`courses.ts`, all drafts).
3. **Talks.** The formats and 3 content pillars are a proposal based on his background (`talks.ts`).
4. **Testimonials.** 3–6 real ones (`testimonials.ts`, empty).
5. **Numbers.** "30+ anos" is inferred from "26 anos" in 2021. "24+ marcas", "5 rádios" and "6 canais de TV" are counted from the old site (`site.ts`).
6. **Contact.** Which email is canonical (`locutor@edurodrigues.com.br` is used; the old footer showed `edulocutor@terra.com.br`), and confirm (11) 99615-9398 is the WhatsApp number.
7. **Rewritten copy.** Bio, service descriptions and FAQs were rewritten from the old text (`career.ts`, `services.ts`). The career-history role mapping was inferred from loose paragraphs.
8. **Client logos.** Get high-res/SVG files and permission to show each one. Decide whether the PT (political party) logo stays.
9. **Portfolio.** Confirm the 2021 voice demos are still current and that the "Bier Trunk" video fits the positioning.
10. **Privacy policy.** A standard LGPD template that should get a legal review.
11. **"Celebrante" vs Eduvoice.** This service overlaps with Eduvoice's event offer (plan §4).

## Deploy

1. Push to a Git repo and import it in Vercel (framework preset: Next.js). Add the env vars above.
2. In Cloudflare DNS, point `edurodrigues.com.br` / `www` to Vercel. **Keep the MX, SPF and DKIM records untouched**; the `@edurodrigues.com.br` mailbox depends on them.
3. Verify the domain in Resend (for `LEAD_FROM_EMAIL`) and create the Turnstile site keys.
4. After go-live: Search Console → submit `/sitemap.xml`, check GTM, and watch 404s for two weeks.
