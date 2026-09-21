# SEO Audit — HR Shastri Marketing Site

**Date:** 2026-09-21  
**Stack:** React 19 + Vite CSR + react-helmet-async + React Router

---

## A. Current website SEO audit (summary)

The site already has basic Helmet meta, Organization/SoftwareApplication JSON-LD, FAQ schema on `/faq`, robots.txt, and sitemap.xml. Gaps remain in title uniqueness quality, OG image, robots/noindex for 404, breadcrumb schema, Terms page, SPA crawl caveats, and centralized SEO config.

## B. Page list / C. Route list

| Route | Page | Indexable |
|-------|------|-----------|
| `/` | Home | Yes |
| `/features` | Features | Yes |
| `/modules` | Modules | Yes |
| `/pricing` | Pricing | Yes |
| `/faq` | FAQ | Yes |
| `/about` | About | Yes |
| `/contact` | Contact | Yes |
| `/privacy-policy` | Privacy Policy | Yes |
| `/terms-of-use` | Terms (to add) | Yes |
| `*` | 404 | Noindex |

External: `/login` (production app), Play Store, App Store.

## D. Technical SEO problems

| Severity | Issue |
|----------|--------|
| **CRITICAL** | Pure CSR SPA — first HTML paint has limited content until JS runs. Google can render JS, but slower; Bing/others weaker. |
| **HIGH** | 404 returns 200 with SPA shell (no real HTTP 404 without server rules). |
| **HIGH** | OG image uses logo (not ideal social card). |
| **MEDIUM** | No `robots` meta; 404 may get indexed if crawled. |
| **MEDIUM** | No `og:locale`, `twitter:site`, theme consistency. |
| **MEDIUM** | Sitemap missing `lastmod`; Terms missing from sitemap/footer target. |
| **LOW** | No Apache/Nginx SPA fallback docs for clean URLs. |

**Architecture decision:** Do **not** migrate to Next.js in this pass. Improve Helmet, static assets, server rewrite guidance, and document optional prerender. Migration is warranted later if organic growth requires static HTML shells for every route.

## E. On-page SEO problems

- Homepage title generic (“Complete HRMS Platform”) — weak primary keyword placement.
- Several titles are single-word (“Features”, “Modules”) — under-descriptive.
- Duplicate default description risk if SEO props omitted.
- Weak H1↔title alignment on some pages (hero vs meta).
- About not in primary nav (footer only) — discoverable but weaker.

## F. Content problems

- Features/Modules are solid; no dedicated thin keyword pages (good — avoid doorway pages).
- Terms of use previously pointed to Contact.
- No breadcrumb UI for hierarchy.

## G. Image SEO problems

- Filenames OK (`hero-dashboard.png`, etc.); prefer WebP later.
- OG uses logo; need dedicated share image.
- Some decorative SVGs OK with empty/aria-hidden.

## H. Performance problems (SEO-adjacent)

- Google Fonts CSS blocking (already preconnect).
- Large dashboard PNGs — LCP risk; hero correctly eager.
- Framer Motion on many sections — OK if reduced-motion respected.

## I. Structured-data opportunities

- WebSite + Organization (home)
- WebPage per page
- BreadcrumbList on internal pages
- FAQPage (exists on `/faq`)
- SoftwareApplication (refine Offer)
- ContactPage on `/contact`

## J. Internal-linking opportunities

- Breadcrumbs
- Footer Terms → real page
- Descriptive anchors in CTAs (already mostly good)
- Related links on 404

## K. Keyword / page map

See `docs/SEO-KEYWORD-MAP.md`.

## L. Recommended changes (implementing)

1. Central `seo-pages` config + upgraded `SEO` component  
2. Unique titles/descriptions/OG/Twitter/robots  
3. OG default image from product screenshot  
4. Breadcrumbs + schema  
5. Terms page + sitemap/robots refresh  
6. 404 noindex + better links  
7. Server SPA + 404 guidance in README  
8. Refine JSON-LD (WebSite, WebPage, ContactPage, Offer)

---

*Implementation follows this audit.*
