# edurodrigues.com.br

The new personal site for Eduardo Rodrigues (voice talent, master of ceremonies, presenter, celebrant, speaker and radio-course teacher). It replaces the 2021 WordPress site and follows [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md). The scrape of the old site is in [scrape/](scrape/README.md).

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Zod · lucide-react. Every page is prerendered as static HTML (25 routes). The only server code is the lead-form Server Action.

## Design

The identity comes from the original material rather than a new invention:

- **Logo:** the original `Edulogo.gif`, shown on a white header and on a white card in the footer. The GIF has a solid white background, so it can't sit directly on a dark surface.
- **Colours:** sampled from the logo, yellow `#F7C500` and black `#211919`. Yellow is used only as a background or on dark surfaces; highlighted text on white uses `brand-700` to meet AA contrast.
- **Type:** Montserrat (headings) and Lato (text), the same fonts the old site used.
- **Imagery:** every background is a scraped photo, placed with `object-position` so Eduardo stays clear of the text.
  - The home hero slides through the old site's studio and corporate-event banners plus the formatura podium photo.
  - The third old banner (IBGC stage) has Eduardo on the left, so it is the Palestras background, with right-aligned text.
- **Menu:**
  - Dropdown panels for Sobre, Serviços, Cursos and Portfólio. Portfólio is a mega menu with the five gallery thumbnails.
  - Panels open on hover, and on keyboard via the chevron buttons (Escape closes).
  - On mobile, a drawer with collapsible sections.
- **Top bar:** address, phones, email and social links, as on the old site.

## Run it

Requires Node ≥ 20.9. On this machine a portable Node 24 LTS is at `C:\tools\node-v24.21.0-win-x64` (add it to `PATH`).

```bash
npm install
cp .env.example .env.local   # optional; every variable is optional in dev
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Pages

| Route | Content |
|---|---|
| `/` | Hero slideshow · 4 services · Perfil · stats · 9 voice demos · Palestras/Cursos · the 5 galleries · videos · Clientes e Parceiros · Formação e trajetória · contact form |
| `/sobre/` | Perfil, portraits, mission, career history (`#trajetoria`), stats, Eduvoice, client logos |
| `/clientes/` | Client segments and all 24 logos (the old page's own wording) |
| `/servicos/` and `/servicos/{locucao,mestre-de-cerimonias,apresentador,celebrante}/` | The 4 services from the old site, each with demos/videos/photos, FAQ and a pre-filled quote form |
| `/palestras/` | Formats, video, stats, content pillars, logos, proposal form (structure of the Gustavo Borges reference) |
| `/cursos/` and `/cursos/[slug]/` | Online and in-person courses (drafts; see below) and a waitlist form |
| `/portfolio/` | `#demos` (9 MP3s) · `#videos` (13 YouTube videos, both Eduvoice channels) · `#galerias` |
| `/corporativo/` `/eduardo-rodrigues/` `/estudio/` `/festas/` `/formaturas/` | The five old gallery pages at their original URLs: 31 photos with captions and a lightbox |
| `/contato/` | Every contact channel (both phones and both emails), the original Google Map, form |

## Where things live

```
src/
  app/                    routes + sitemap, robots, icons, static OG image
    actions/lead.ts       Server Action: Zod validation → honeypot → Turnstile → Resend
  content/                ALL copy and media references (edit here, not in pages)
    site.ts               identity, contact, social, YouTube channels, stats
    navigation.ts         main menu + dropdown panels
    home.ts               hero slides (image, caption, desktop/mobile focal point)
    career.ts             Perfil (original text), education, career, client segments
    services.ts           the 4 services + Palestrante card, banners
    gallery.ts / gallery-categories.ts   31 photos in the 5 original galleries
    demos.ts · videos.ts · clients.ts · talks.ts · courses.ts · testimonials.ts
  components/
    layout/               top bar, header (dropdowns + mobile drawer), footer, logo, WhatsApp, GTM/consent
    sections/             hero slider, page banner, service cards, stats band, image panels, gallery cards, logos…
    media/                audio playlist, YouTube facade, gallery + lightbox, map
    forms/lead-form.tsx   one form for quotes, talks and courses
  assets/                 images imported by content files (optimised by next/image), OG/icon fonts
public/audio/             the 9 voice demos (MP3)
```

**All scraped material is used.** That covers the logo, the 3 hero banners, both portraits, all 29 gallery photos plus the 2021 Perfil photo, the 24 client logos, 9 demos, 13 videos, and every text block. That text includes the rotating hero titles, Perfil, services, client segments, "Outras Informações", the contact blocks and the map. The build imports every file in `src/assets/images`.

Two pieces were deliberately left out: the old "Powered by: ColetivaWeb" credit (the previous agency) and the WordPress theme's demo content.

**Courses are drafts.** All courses in `courses.ts` have `draft: true`. They show in `npm run dev`, or in a preview with `SHOW_DRAFTS=true`, with a red "Rascunho" badge and `noindex`. In production they 404, and `/cursos` shows a waitlist form. To publish one, fill in the real data and set `draft: false`, plus `checkoutUrl` for online courses.

**Testimonials** stay empty until real ones are provided; their sections render only when the array has items.

## Integrations (`.env.local`)

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Loads Google Tag Manager (old container: `GTM-599783W`) with Consent Mode v2 defaulting to *denied*, plus the LGPD cookie banner. Leave it unset in dev/preview. |
| `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` | Emails each lead via Resend. **Without a key:** in dev the lead is only logged; in production the form shows an error and points to WhatsApp. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile anti-spam. Without it, only the honeypot protects the form. |
| `SHOW_DRAFTS` | `true` shows draft courses in a production build (client previews only). |

## URLs from the old site

`trailingSlash: true` keeps the old URL style. `/`, `/servicos/`, `/clientes/`, `/contato/` and the five gallery pages exist at exactly the same addresses. Only two things redirect (308):

| Old | New |
|---|---|
| `/meu-portfolio/` | `/portfolio/` |
| `/wp-content/uploads/2021/05/*.mp3` | `/audio/*.mp3` |

The 37 WordPress theme demo URLs (`/shop/`, `/team/*`, `/services/*`…) are deliberately left to 404.

## What was checked

- `tsc`, ESLint and `next build` are clean.
- Every client URL from the old sitemap was requested against the production build: 200s, or a single-hop redirect.
- Browser tests in headless Edge (DevTools Protocol, device emulation):
  - **Form:** flags invalid fields and keeps typed values; a valid submission shows the success state.
  - **Hero:** slideshow autoplays, and pause stops it.
  - **Media:** demos play and switch tracks; a video start pauses the audio.
  - **Menus:** dropdowns open with Enter and close with Escape; the mobile drawer opens with focus on its close button.
  - **Galleries:** gallery page chips work; the lightbox opens, advances with arrow keys and closes.
  - **General:** no horizontal overflow at 390 px, no console errors.
- The OG image is a static 84 KB JPEG (logo + studio banner). Generated PNGs are too large for WhatsApp previews.

## Content to confirm with the client (`REVISAR`)

Each item is marked `REVISAR` in the code:

1. **Photos and logo.** The logo is a 298×115 GIF. A vector version would look sharper on retina screens. Most photos date from 2007–2021; a new shoot would strengthen the hero.
2. **Courses.** Real names, syllabus, workload, price, class dates and the checkout platform (`courses.ts`, all drafts).
3. **Talks.** The formats and 3 content pillars are a proposal (`talks.ts`).
4. **Testimonials.** 3–6 real ones (`testimonials.ts`, empty).
5. **Numbers.** "30+ anos" is inferred from "26 anos" in 2021; the other stats are counted from the old site (`site.ts`).
6. **Contact.** Which of the two emails is primary, and confirm (11) 99615-9398 is WhatsApp.
7. **Copy.** The Perfil is the original text, lightly corrected. The service intros, FAQs and career role mapping were written from the old content.
8. **Client logos.** Get permission to show each one; decide whether the PT (political party) logo stays.
9. **Portfolio.** Confirm the 2021 demos are current and that the "Bier Trunk" video fits.
10. **Privacy policy.** A standard LGPD template; get a legal review.

## Deploy

1. In Vercel, import the GitHub repo (framework preset: Next.js). Add the env vars above.
2. In Cloudflare DNS, point `edurodrigues.com.br` / `www` to Vercel. **Keep the MX, SPF and DKIM records untouched**; the `@edurodrigues.com.br` mailbox depends on them.
3. Verify the domain in Resend (for `LEAD_FROM_EMAIL`) and create the Turnstile site keys.
4. After go-live: Search Console → submit `/sitemap.xml`, check GTM, and watch 404s for two weeks.
