# Development plan: Eduardo Rodrigues personal site (edurodrigues.com.br)

**Scope:** Project 1 only (Eduardo's personal/professional site). Eduvoice is out of scope; the only point of contact is a link to eduvoice.com.br.
**Stack:** Next.js (latest stable, App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.
**Inputs:** the full scrape in [`scrape/`](scrape/README.md) (content, media, issues) and the client brief. The structural reference is gustavoborges.com.br/palestras.

> **Status (2026-09-24):** phases 3a–3d are built. The site runs on the scraped content, with the new copy clearly marked; see [README.md](README.md). Blocked on the client for §3 items 1–2 and 4–10 (the photoshoot and logo, courses, talks, testimonials and numbers, among others).
> Deviations from this plan:
> - Content is validated by TypeScript types instead of Zod; Zod validates only the form.
> - Animations use CSS only; the `motion` library wasn't needed.
> - The OG image ships as a static JPEG because a generated PNG was too large for WhatsApp previews.
> - Talks and courses use the design system directly; there was no separate hi-fi design step.
>
> **Redesign (2026-09-24, after the client's feedback on the first version):**
> - **Visual identity:** rebuilt from the original material: the logo GIF, the logo's yellow and black, and the old site's Montserrat/Lato.
> - **Backgrounds:** every hero and banner background is a scraped photo.
> - **Navigation:** now uses dropdowns, including a Portfólio mega menu.
> - **Old URLs:** the old `/clientes/` and five gallery URLs are real pages again, instead of redirects.
> - **Material:** all scraped assets and text are now used.

---

## 1. Goal

Turn a 2021 WordPress theme site into a **personal brand site built for authority and conversion**. It should turn visitors into one of four things:

1. **Hire Eduardo** as a voice talent (voice-over, spots, IVR, e-learning), master of ceremonies, presenter, or celebrant.
2. **Book a talk** (palestra).
3. **Enroll in an online course** in communication.
4. **Enroll in an in-person course** at the headquarters (Av. Nova Cantareira, Tucuruvi).

On every page the visitor should be able to tell who Eduardo is, why to trust him, and how to hire him or enroll.

## 2. What the scrape tells us

- **There is little real copy**, about 600 words across 10 pages. The valuable assets are the **9 voice demos**, the **13 videos**, the **24 client logos**, and the **career history** (HBO Brasil, History Channel, TV Band, Gazeta, RedeTV, SENAC teacher, Mackenzie journalism degree, Reinaldo Polito oratory).
- **None of the new scope exists yet.** There is no content for courses, talks, testimonials, or authority numbers.
- **Photos are not good enough for a premium redesign.** Most date from 2007–2016, and the newest are 2021 phone photos.
- **The brand identity is the theme's default.** The logo is a GIF, the favicon is a placeholder, and the colour is the theme's yellow.

**Conclusion:** the critical path is content and photography, not code. Start the content requests on day 1, in parallel with setup.

## 3. Content to request from the client (blocking)

| # | Item | Needed for | Blocks |
|---|---|---|---|
| 1 | **Professional photoshoot**: portrait/headshot, at the mic in the studio, on stage/at the podium, teaching a class. Landscape and portrait crops. | Hero, About, Talks, Courses | Design |
| 2 | **Logo**: vector version of the current one, or approval for a refresh | Header, favicon, OG images | Design |
| 3 | **Updated bio** (short 50 words + long 250 words) and years of career (the "26 anos" figure dates from 2021) | Home, About | Build |
| 4 | **Authority numbers**: years on air, events hosted, students trained, brands served | Proof bar (as in the reference) | Build |
| 5 | **Online courses**: name, promise, audience, syllabus, workload, price, **platform and checkout link** (Hotmart / Eduzz / Kiwify / other) | /cursos | Build |
| 6 | **In-person courses**: name, syllabus, dates/class groups, time, capacity, price, how enrollment works | /cursos | Build |
| 7 | **Talks**: 2–4 themes/pillars, formats (in person / online / in-company), audience, and whether to show a fee or "sob consulta" (on request) | /palestras | Build |
| 8 | **Testimonials**: 3–6, with name, role, and company (photo optional) | Home, Talks, Courses | Build |
| 9 | Client logos in **SVG/PNG high-res** (current files are 208×98 JPG) and confirmation that each may still be shown | Logo wall | Build |
| 10 | **Canonical email** (the site shows both `edulocutor@terra.com.br` and `locutor@edurodrigues.com.br`) and **WhatsApp number** (probably (11) 99615-9398) | Forms, CTAs | Build |
| 11 | Are the 2021 voice demos still current, or will new ones be recorded? | Portfolio | Launch |
| 12 | Access: domain registrar, **Cloudflare DNS**, WordPress admin (to recover the 18 media files the public API hides), GTM `GTM-599783W` | Launch | Launch |

## 4. Positioning boundary with Eduvoice (confirm with client)

The brief separates the two sites. This plan assumes:

- **edurodrigues.com.br = Eduardo the professional.** Voice talent, MC, presenter, celebrant, speaker, teacher. Event photos stay as proof of his work as a host.
- **eduvoice.com.br = the company.** Event production (graduations, weddings, 15th birthday parties), studios, social media, video. The personal site links to it ("Conheça minha produtora, a Eduvoice").

Studio and podcast services and event production therefore stay off this site. Confirm this, because "Celebrante: Casamento, Bodas, Debutante" overlaps with Eduvoice's event offer.

## 5. Information architecture

### New sitemap

```
/                               Home
/sobre                          About: bio, career, education, clients
/servicos                       Services overview
  /servicos/locucao             Voice work (spots, voice-over, IVR, e-learning, narration, promos)
  /servicos/mestre-de-cerimonias
  /servicos/apresentador
  /servicos/celebrante
/palestras                      Talks (modelled on the reference page)
/cursos                         Courses hub, split into two sections: Online · Presenciais
  /cursos/[slug]                Course detail (online or in person)
/portfolio                      Tabs: Áudio · Vídeos · Fotos (filterable galleries)
/contato                        Contact
/politica-de-privacidade        Privacy policy (LGPD, required: forms + GTM)
```

Main nav (6 items): **Sobre · Serviços · Palestras · Cursos · Portfólio · Contato**, plus a primary CTA button, **"Solicitar orçamento"** (request a quote). A floating WhatsApp button appears on all pages.

### Page blueprints

**Home.** Follows the reference page's order: authority first, then offer, then proof, then conversion.
1. **Hero**: new portrait, a single `<h1>` ("Eduardo Rodrigues — a voz do seu evento" or similar), and the 7 old rotating titles kept as an animated line (Locução publicitária · Voice Over · Mestre de cerimônias · Narrações · Apresentador · Docente · Palestrante). Two CTAs: *Solicitar orçamento* and *Conheça os cursos*.
2. **Proof bar**: 3–4 numbers from item 4 of the content list.
3. **Logo wall**: "Marcas e instituições que já confiaram", the 24 logos as a marquee.
4. **What I do**: 5 cards (Locução, Mestre de cerimônias, Apresentador, Celebrante, Palestras), each linking to its page.
5. **Listen to the voice**: featured player with "Repertório Completo" plus 3 category chips, linking to /portfolio.
6. **Courses**: teaser with the next in-person class plus online course cards.
7. **Featured video**: "Eduardo Rodrigues - Mestre de Cerimônias" (`Ws7-vCyzTBw`).
8. **Testimonials**.
9. **About teaser**: short bio and photo, linking to /sobre.
10. **Final CTA and lead form**.

**Sobre** (About): long bio (rewritten from the "Perfil" copy) · career timeline built from the "Trajetória no mercado" list (radio → TV → teaching → presenting) · education (Direito FIG-UNIMESP, Jornalismo Mackenzie, Oratória Instituto Reinaldo Polito, SENAC courses) · the 5 client segments from /clientes plus the logo wall · link to Eduvoice.

**Serviços/[slug]** (Services): one template for all four. Hero · description (the /servicos lines expanded) · event or use types · related demos, videos, and photos pulled from the portfolio by tag · short FAQ · a CTA form with the service pre-selected.

**Palestras** (Talks). Mirrors the reference page section for section:
1. Hero with CTA
2. Formats (Presencial · Online · In-company), each with a "Solicitar proposta" button
3. Video and numbers
4. Logos
5. Content pillars (themes)
6. Testimonials
7. Lead form (Nome, E-mail, Telefone, Empresa, Data do evento, Nº de participantes)

**Cursos** (Courses): two clearly separated sections.
- *Online*: cards (thumbnail, title, workload, price) → detail page → **external checkout** on the course platform. We do **not** build an LMS.
- *Presenciais na sede*: cards with the **next class date**, seats, and address → detail page → enrollment form or WhatsApp with a pre-filled message.
- Course detail template: promise · who it's for · what you'll learn (modules) · instructor · format, duration, location · next classes · investment · FAQ · sticky CTA.

**Portfólio**: three tabs.
- **Áudio**: the 9 demos, playing one track at a time.
- **Vídeos**: the 13 YouTube videos as click-to-load cards.
- **Fotos**: all gallery photos in one filterable grid (Corporativo · Formaturas · Festas · Estúdio · Apresentador) with a lightbox and a year on each caption. This replaces the 5 thin gallery pages and the empty "Galeria" menu item.

**Contato** (Contact): form (Nome, E-mail, WhatsApp, *Tipo de serviço* select, Data do evento, Cidade, Mensagem) · WhatsApp and phone buttons · email · address · map (click-to-load).

### Redirects (301, `next.config.ts`)

| Old URL | New URL |
|---|---|
| `/meu-portfolio/` | `/portfolio` |
| `/eduardo-rodrigues/` | `/sobre` |
| `/clientes/` | `/sobre` |
| `/corporativo/` | `/portfolio?tab=fotos&galeria=corporativo` |
| `/formaturas/` | `/portfolio?tab=fotos&galeria=formaturas` |
| `/festas/` | `/portfolio?tab=fotos&galeria=festas` |
| `/estudio/` | `/portfolio?tab=fotos&galeria=estudio` |
| `/servicos/`, `/contato/` | same path; the trailing slash is normalised by Next |
| `/wp-content/uploads/2021/05/*.mp3` | `/audio/*` (the demos may be linked externally) |

The 37 theme demo URLs (`/shop/`, `/team/*`, `/services/*` and others; full list in `scrape/content/site-content.json → discardedDemoContent`) are **left to 404**. They were never client content, and a 404 gets them dropped from the index.

## 6. Technical architecture

| Concern | Decision |
|---|---|
| Rendering | Every page is static (SSG). The only server code is the form Server Action. |
| Content | Typed content modules in `src/content/*.ts`, seeded from `scrape/content/site-content.json` and validated with **Zod** at build time. **Decision point:** if Eduardo must edit course dates and testimonials himself, add a headless CMS (Sanity, free tier) for those two collections only. The content layer sits behind `lib/content.ts`, so switching is a single-module change. Default: no CMS. |
| Forms | Server Action + Zod · email via **Resend** to the canonical inbox · **Cloudflare Turnstile** plus a honeypot against spam (the domain is already on Cloudflare) · `generate_lead` dataLayer event with the form name and service. This fixes the old bug where the email field was named `your-subject` and never validated. |
| WhatsApp | `wa.me/5511996159398?text=…` with a pre-filled message per page (for example, "Olá Eduardo, vim pela página de Palestras…"). |
| Images | `next/image` (AVIF/WebP, responsive `sizes`), files moved to `public/images/**` with slug names and **real alt text** (the old site has none). |
| Audio | `public/audio/*.mp3` (about 32 MB; fine as static files). A custom `<AudioDemo>` component: one global "now playing", progress/seek, duration, keyboard-accessible, `preload="none"`. |
| Video | `<YouTubeFacade>`: a thumbnail from `scrape/assets/video-thumbs` plus a play button, which loads the `youtube-nocookie.com` iframe only on click. The old portfolio page loads 13 full players at once. |
| Map | Static preview image, with the Google Maps iframe loaded on click. |
| Fonts | `next/font` (self-hosted; no layout shift). |
| Motion | Tailwind transitions plus `motion` for the hero word rotator and section reveals, respecting `prefers-reduced-motion`. |
| SEO | Metadata API per route, `sitemap.ts`, `robots.ts`, dynamic `opengraph-image.tsx`, canonical URLs, `lang="pt-BR"`, breadcrumbs. **JSON-LD**: `Person` (with `sameAs` pointing to the social profiles), `ProfessionalService` (address, geo, phone; consistent with the Google Business Profile "Eduardo Rodrigues Locutor"), `Course` + `CourseInstance`, `Event` for in-person classes, `VideoObject`. |
| Analytics / LGPD | Keep **GTM-599783W** (`@next/third-parties`) behind a consent banner (Google Consent Mode v2). Add the privacy policy page. |
| Hosting | Vercel, with preview deployments per PR. DNS stays on Cloudflare: point the A/CNAME records at Vercel and **keep the MX, SPF, and DKIM records untouched** (the `@edurodrigues.com.br` email depends on them). |
| Quality gates | TypeScript strict · ESLint + Prettier · Playwright smoke tests (every route loads, form submits, every old URL redirects correctly) · Lighthouse CI budget (LCP < 2.5 s, CLS < 0.1, a11y ≥ 95) · axe checks. |

### Project structure

```
src/
  app/
    layout.tsx                 # fonts, GTM, header/footer, WhatsApp FAB, JSON-LD Person/Org
    page.tsx                   # Home
    sobre/page.tsx
    servicos/page.tsx
    servicos/[slug]/page.tsx   # generateStaticParams from content/services
    palestras/page.tsx
    cursos/page.tsx
    cursos/[slug]/page.tsx
    portfolio/page.tsx
    contato/page.tsx
    politica-de-privacidade/page.tsx
    not-found.tsx
    sitemap.ts  robots.ts  opengraph-image.tsx
    actions/lead.ts            # Server Action: validate → Turnstile → Resend
  components/
    layout/   Header, MobileNav, Footer, WhatsAppFab, ConsentBanner
    ui/       Button, Container, Section, Heading, Badge, Card, Tabs
    sections/ Hero, RoleRotator, ProofBar, LogoMarquee, ServiceCards, CourseCards,
              Testimonials, Timeline, FormatCards, Pillars, CtaBand, LeadForm, Faq
    media/    AudioDemo, AudioPlaylist, YouTubeFacade, Gallery, Lightbox, MapFacade
  content/    site.ts, contact.ts, services.ts, talks.ts, courses.ts, demos.ts,
              videos.ts, gallery.ts, clients.ts, career.ts, testimonials.ts
  lib/        content.ts (Zod schemas + getters), seo.ts (JSON-LD builders), whatsapp.ts
public/
  images/{brand,hero,about,gallery/*,clients,courses}/   audio/   video-thumbs/
```

## 7. Design direction

- **Own identity, distinct from Eduvoice.** The personal site should feel like a stage: editorial, premium, personal. Eduvoice will read as an agency.
- **Proposal:** a dark neutral base for the hero and demo sections, light sections for reading, and **one signature accent** replacing the theme's yellow `#ffc925`. Pair a strong display face for headlines with a clean sans for body text. Use a subtle **sound-wave motif** tied to "the voice" in dividers, the audio player, and the loaders. Use large photography.
- **Deliverables before build:** refreshed vector logo, a style tile (colour, type, buttons, cards), and hi-fi mobile and desktop screens for **Home, Palestras, Curso detail, and Portfólio**. The other pages reuse these components.
- Implement the style tile as Tailwind v4 `@theme` tokens (colours, fonts, radii, spacing) so the design and the code share one source.

## 8. Phases and timeline

About **7–8 weeks elapsed**. Timing is driven by client content and the photoshoot, not by development.

| Phase | Weeks | Work | Exit criteria |
|---|---|---|---|
| **0. Discovery** | 1 | Kickoff with Eduardo; send the content request (§3) and the Eduvoice boundary question (§4); schedule the photoshoot; get domain, DNS, WP admin, and GTM access; decide on the course platform and CMS. | Content checklist owned and dated |
| **1. IA and wireframes** | 1–2 | Sitemap (§5), low-fi wireframes for all templates, copy outline per page. | Client approves the structure |
| **2. Visual design** | 2–3 | Logo refresh, style tile, hi-fi key screens. | Client approves the design |
| **3a. Foundation** | 2–3 | Repo, Next + TS + Tailwind v4, lint/format, CI, Vercel previews; design tokens; Header/Footer/MobileNav/WhatsApp FAB; the content layer with Zod schemas, seeded from `site-content.json`; asset migration to `public/` with alt text. | Skeleton site deployed to preview |
| **3b. Components** | 3–4 | AudioDemo/Playlist, YouTubeFacade, Gallery + Lightbox, LogoMarquee, MapFacade, Timeline, Testimonials, LeadForm, FAQ. | Components working with real scraped data |
| **3c. Pages** | 4–6 | Home, Sobre, Serviços (+4), Palestras, Cursos (+ detail), Portfólio, Contato, Privacy, 404. | All routes built on real or placeholder copy |
| **3d. Integrations** | 5–6 | Lead Server Action + Resend + Turnstile; GTM + consent; SEO (metadata, JSON-LD, sitemap, OG); redirects. | Test lead received; Rich Results test passes |
| **4. Content and QA** | 6–7 | Load final copy and photos; proofread in pt-BR (fix the typos listed in `scrape/README.md`); cross-browser and device testing; axe + Lighthouse; test every old URL in `scrape/raw/all_urls.txt`. | Client sign-off on staging |
| **5. Launch** | 7–8 | DNS cutover (keep MX); Search Console: verify and submit the sitemap; check GTM; watch 404s and form deliverability for 2 weeks. | Live, no crawl errors on the new routes |

## 9. Asset plan: from the scrape to the new site

| Asset | Keep? | Notes |
|---|---|---|
| 9 voice demos (MP3) | **Keep** | Unless new demos are recorded (§3, item 11). Rename to slugs; add a category tag to each. |
| 13 YouTube videos | **Keep** | Use the Home feature (`Ws7-vCyzTBw`) and tag the rest by service. Ask whether the Bier Trunk video still fits the positioning. |
| 24 client logos | **Keep, re-source** | Get high-res/SVG versions; convert to single-colour for the marquee. |
| 29 gallery photos + 5 unused | **Keep as history** | Show them in Portfólio → Fotos with year labels ("Trajetória"). Don't use them in hero or key positions. |
| 3 hero images, profile photo | **Replace** | Replace with the new photoshoot. |
| Logo GIF, favicon | **Replace** | Use the vector logo; generate the favicon and app icons from it. |
| Copy (bio, services, career) | **Rewrite** | Use the scraped text as the factual base; update the years; fix the typos. |

## 10. Open decisions for the client

1. Which course platform (online), and how in-person enrollment and payment work.
2. Whether a CMS is needed (only if Eduardo edits course dates and testimonials himself).
3. Whether "Celebrante" stays here or moves to Eduvoice (§4).
4. Show fees or "sob consulta" for talks and courses.
5. The canonical email, and whether the Terra address should be retired.
6. Optional phase 2: a blog/articles section (the reference has one; it would help rank for "curso de locução SP") and a newsletter.
