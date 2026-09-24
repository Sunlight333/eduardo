# edurodrigues.com.br — scrape report

Scraped 2026-09-24 from the live site. Every page listed in the WordPress sitemap was fetched (47 URLs), and the REST API (`/wp-json/wp/v2/pages`, `/media`) was used as the source of truth for pages and media. All client media was downloaded at original resolution.

## Folder layout

| Path | What it is |
|---|---|
| `content/site-content.json` | **All client content, verbatim and structured** (nav, contact, every page's text, captions, audio, videos, client logos). Start here when building the new content layer. |
| `media-manifest.csv` | One row per downloaded file: local path, original URL, dimensions, duration, bytes, upload date, pages that use it, caption. |
| `assets/brand/` | Logo (`Edulogo.gif`, 298×115) + favicon (theme placeholder, not the client's). |
| `assets/hero/` | 3 home hero slideshow images (1920×580). |
| `assets/profile/` | Home "Perfil" photo (864×1152) + an unused 2560×1920 portrait. |
| `assets/gallery/{corporativo,eduardo-rodrigues,estudio,festas,formaturas}/` | Gallery photos, originals (the site shows them as 400×400 crops). |
| `assets/clients/` | 24 client/partner logos (208×98 JPG). |
| `assets/audio/` | 9 voice-demo MP3s (~32 MB). |
| `assets/video-thumbs/` | Thumbnails for the 13 YouTube portfolio videos (for click-to-load posters). |
| `raw/pages/` | Rendered HTML of all 47 sitemap URLs. |
| `raw/*.json`, `raw/sitemap_*.xml` | REST API responses and sitemaps. |
| `raw/youtube/` | oEmbed metadata for each video. |
| `raw/ref_gustavoborges_palestras.html` | The client's reference page, for structure comparison. |

## Totals

| | Count |
|---|---|
| Real client pages | 10 (Home, Serviços, 5 galleries, Clientes, Portfólio, Contato) |
| Theme demo leftovers still published | 37 (22 pages + 6 `services/*` + 9 `team/*`) — not migrated |
| Images downloaded | 60 (1 logo, 1 favicon, 3 hero, 2 profile, 24 logos, 29 gallery) |
| Of which not shown on any page | 5 (listed in `site-content.json → galleries.unusedInLibrary`) |
| Audio (MP3) | 9 unique; the library held 4 byte-identical copies of "Repertório Completo" (MD5 `3c6815c3…`), deduplicated |
| Videos | 13 YouTube embeds (no self-hosted video). All 13 still live. 12 on `@eduvoiceestudio`, 1 on `@eduvoice7370` |
| External links | Facebook, Instagram, LinkedIn, ColetivaWeb (agency credit), Google Maps embed |
| Media hidden from the public API | 18 (API reports 130 items, exposes 112 — attached to private/draft posts; need WP admin access to retrieve) |

## Site map as it exists today

```
/                    Home — hero slideshow + 7 rotating titles, "Perfil", client logo carousel, "Outras Informações" (education + career)
/servicos/           4 services: Locutor, Apresentador, Mestre de Cerimônias, Celebrante
Galeria (menu only, href="#")
  /corporativo/        5 photos + captions
  /eduardo-rodrigues/  5 photos + captions
  /estudio/            5 photos + captions
  /festas/             3 photos + captions
  /formaturas/         7 photos + captions
/clientes/           5 client segments + 24-logo carousel
/meu-portfolio/      9 audio demos + 13 YouTube videos
/contato/            Map, address, phones, email, form
```

Global on every page: top bar (address, phones, 3 social icons) · header (GIF logo + menu) · footer (address/phones/email · Google Map · contact form) · bottom bar ("Copyright©2020…", "Powered by: ColetivaWeb") · GTM container `GTM-599783W`.

## Contact data (decoded)

Emails were hidden by Cloudflare email obfuscation and have been decoded:

- Footer (all pages): **edulocutor@terra.com.br**
- /contato page: **locutor@edurodrigues.com.br**

Address: Avenida Nova Cantareira, 2233 – Conjunto 81, Tucuruvi, São Paulo – SP, 02331-003
Phones: (11) 2261-2753 · (11) 99615-9398
Map pin: "Eduardo Rodrigues Locutor" (-23.475936, -46.614191)

## Problems found on the current site

These carry over into the redesign as things to fix or confirm:

1. **Contact form bug**: the "Email" field is named `your-subject` and isn't validated, so leads can arrive without a usable email.
2. **Two different emails** are published (terra.com.br in the footer, edurodrigues.com.br on /contato). Confirm which one is canonical.
3. **37 theme demo URLs are live and in the sitemap** (e.g. `/shop/`, `/team/richard-wagner/`, `/services/green-building/`). One demo page still shows `contact@construction.com`.
4. **No SEO basics**: no meta descriptions, no OG image, zero alt text on images, and the hero renders 7 `<h1>` tags.
5. **Brand assets are placeholders or low-res**: the logo is a 298×115 GIF, the favicon is the construction theme's icon, and the accent colour `#ffc925` is the theme default.
6. **Photos are dated**: most are 2007–2016. The newest (2021) are WhatsApp photos, and the "Perfil" photo shows another client's logo on screen.
7. **Outdated copy**: "mais de 26 anos" was written in 2021, and the footer still says ©2020.
8. **Typos in source copy** (kept verbatim in the JSON): "portifólio", "History Chanel", "Curso de Profissionalizante Locução", "15o.Congresso IBCG" (the filename says IBGC), "Gonzales" vs "Gonzalez", "Estudio".
9. **The gallery hub has no page**: the "Galeria" menu item is `href="#"`.
