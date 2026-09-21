# HR Shastri — Premium SaaS Redesign Plan

## 1. Existing website audit

### A. Live site (hrshastri.com — WordPress + Elementor)

| Area | Current state | Issue | Redesign action |
|------|---------------|-------|-----------------|
| Platform | Elementor page builder, many CSS bundles | Slow, inconsistent spacing, template feel | Static React + design tokens, minimal CSS |
| Visual identity | Purple→magenta gradient CTAs, Inter/Rubik | Reads as marketing site, not product-led | Logo royal blue as **primary**; gradient for **accent/CTA only** |
| Hero | Image/carousel-led | Weak product proof | Product mockup + inline trust metrics + dual CTA |
| Navigation | Standard WP menu | No persistent conversion path | Sticky header, Book Demo + Free Trial always visible |
| Features | Icon grids, long scroll | Feature list, not capability story | Pillars → feature grid → module stories |
| Social proof | Client carousel | Low trust density | Metrics bar + testimonial cards + industry tags |
| Modules | Text + images mixed | Uneven hierarchy | Alternating **product story** blocks with UI previews |
| Pricing | Plan cards | OK structure | Highlight tier, comparison clarity, risk reversal |
| FAQ | Accordion | OK | SEO FAQ schema + “HRM explainer” block |
| Contact | Form + purple icons | Dated card UI | Split layout, map, pre-filled intents |
| Performance | Heavy plugins | Poor Core Web Vitals | Vite, lazy routes, lazy images, reduced motion |
| SEO | Basic meta | Thin structured data | Organization + SoftwareApplication + FAQPage |

**Legacy pages/sections to preserve (content, not layout):** Home, Features/Services, How It Works, Modules, About, Values, FAQ, Contact, Pricing, Mobile app, Login (external).

### B. Current React rebuild (hrshashtri_web)

| Area | Current state | Gap vs premium SaaS |
|------|---------------|------------------------|
| Design system | Ad-hoc Tailwind utilities | No documented tokens, type scale, or component variants |
| Hero | Functional mockup | Needs mesh background, trust row, clearer hierarchy |
| Cards | Similar bordered boxes | Needs elevation levels, hover depth, icon treatment |
| Typography | Single sans stack | Needs display/body/meta scale |
| Motion | Generic fade-in everywhere | Needs stagger, reduced-motion, purposeful hero only |
| Conversion | CTAs present | Missing mid-page CTA bands and sticky intent |
| Inner pages | Text-only heroes | Need `PageHero` + breadcrumb-style eyebrow |
| Product proof | Placeholder logos/screens | Structure ready for real assets |

---

## 2. New sitemap

```
/                 Home (primary conversion)
/features         Capability overview + how it works
/modules          Module deep-dives (anchor IDs)
/pricing          Plans + FAQ snippet + CTA
/faq              Full FAQ + HRM explainer
/about            Company, team proof, values
/contact          Form, map, sales intents (?intent=)
/login            External app URL
/404
```

**Future (phase 2, not blocking launch):** `/payroll`, `/security`, `/mobile`, `/customers` — can be sections first, pages later.

---

## 3. New homepage structure (conversion narrative)

1. **Announcement bar** — single rotating offer (demo / trial / feature)
2. **Header** — logo, nav, Login, Book Demo, Free Trial
3. **Hero** — headline, subcopy, dual CTA, trust micro-row (500+ cos / 50k+ employees / 4.9 rating)
4. **Product preview** — dashboard mockup + floating KPI chips
5. **Logo / trust strip** — client names + satisfaction line
6. **Three pillars** — People · Payroll · Employee app (link to modules)
7. **Feature grid** — 13 cards with icon hover
8. **Module stories** — alternating layout (9 modules, condensed on home: show 3, link to /modules)
9. **Why HR Shastri** — 7 trust cards
10. **Product tour** — screenshot slider (dark band)
11. **Implementation** — 4 steps
12. **Testimonials** — 3 quotes
13. **Stats band** — gradient metrics
14. **HRM explainer** — education + SEO copy
15. **FAQ preview** — 6 items → /faq
16. **Pricing preview** — 3 tiers
17. **Mobile app** — store CTAs
18. **Final CTA band** — “Book demo” full-width
19. **Contact** — form + map
20. **Footer** — sitemap columns + social

---

## 4. Design direction

**Positioning:** Enterprise-ready HRMS for Indian mid-market — credible like BambooHR/Keka, localized like Indian payroll compliance.

**Visual language:**
- White / soft gray surfaces (90% of UI)
- Royal blue (`#0033CC`) for links, icons, secondary buttons — matches logo “HR”
- Purple→magenta gradient **only** for primary CTAs, stats band, announcement bar
- Deep navy (`#0B1220`) for dark sections (product tour), not pure black
- Soft shadows (low spread), 12–16px radii on cards, 9999px pill buttons
- Generous whitespace; max content width 720px for prose, 1280px container

**Anti-patterns to avoid:** Bootstrap grids, stock illustration overload, rainbow gradients, centered everything, pulse animations on text.

---

## 5. Color system

| Token | Hex | Usage |
|-------|-----|--------|
| `--brand-blue` | `#0033CC` | Logo alignment, links, icon backgrounds |
| `--brand-blue-hover` | `#002AAD` | Hover states |
| `--brand-purple` | `#51459D` | Gradient start, accents |
| `--brand-magenta` | `#B83F81` | Gradient end |
| `--brand-ink` | `#2B2B2B` | Headings (logo SHASTRI tone) |
| `--brand-navy` | `#0B1220` | Dark sections, footer |
| `--surface-0` | `#FFFFFF` | Base |
| `--surface-1` | `#F8FAFC` | Alternate sections |
| `--surface-2` | `#F1F5F9` | Nested cards |
| `--text-muted` | `#64748B` | Body secondary |
| `--border-subtle` | `#E2E8F0` | Card borders |

**Gradients:** `linear-gradient(135deg, #51459D 0%, #B83F81 100%)` — CTAs and hero accents only.

---

## 6. Typography system

**Font:** Plus Jakarta Sans (already loaded)

| Role | Size (mobile → desktop) | Weight | Tracking |
|------|-------------------------|--------|----------|
| Display (H1) | 2.25rem → 3.75rem | 800 | -0.02em |
| H2 section | 1.875rem → 2.25rem | 700 | -0.02em |
| H3 card | 1.125rem → 1.25rem | 600 | normal |
| Body | 1rem → 1.0625rem | 400 | normal |
| Lead | 1.0625rem → 1.125rem | 400 | normal |
| Eyebrow | 0.75rem | 600 | 0.08em uppercase |
| Meta | 0.8125rem | 500 | normal |

**Line height:** Headings 1.15–1.2, body 1.6–1.7.

---

## 7. Component architecture

```
components/
  layout/     AnnouncementBar, Header, Footer, MainLayout
  marketing/  PageHero, CtaBand, TrustBar (new)
  sections/   Page-specific section compositions
  product/    DashboardMockup, ModulePreview (new)
  ui/         Button, Badge, Card, Container, SectionHeading, Accordion, MotionReveal
  seo/        SEO + JSON-LD helpers
hooks/        useReducedMotion
lib/          constants, motion-presets
data/         content only (no JSX)
styles/       tokens in index.css @theme
```

**Component rules:**
- Sections compose `ui/*`; no raw `<div className="rounded-2xl border...">` duplicated >2 times
- All CTAs use `Button` variants: `primary` (gradient), `secondary` (blue), `outline`, `ghost`
- `Card` variants: `elevated`, `outline`, `glass`

---

## 8. Animation strategy

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hero text | fade + y 16 | 0.5s | easeOut |
| Hero mockup | fade + scale 0.98→1 | 0.7s | easeOut |
| Section headings | in-view once, y 12 | 0.45s | easeOut |
| Feature cards | stagger 0.04s | 0.35s | easeOut |
| Hover cards | translateY -4px | 0.2s | ease |
| Accordion | height + opacity | 0.25s | easeInOut |

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` + hook to skip Framer transforms.

**Do not animate:** announcement text pulse, infinite distracting loops except hero KPI chips (subtle).

---

## 9. SEO strategy

- **Technical:** canonical URLs, sitemap.xml, robots.txt, semantic `<main>`, one H1 per page
- **Meta:** unique title/description per route (react-helmet-async)
- **Schema:** Organization, SoftwareApplication (home), FAQPage (/faq)
- **Content:** HRM explainer, India payroll keywords, module anchor URLs
- **Performance:** route-based code splitting, preconnect fonts, lazy iframes/images
- **Phase 2:** blog/resources for long-tail HR compliance content

---

## 10. Implementation phases

**Phase 1 (this pass):** Design tokens, UI primitives, hero/trust/header/footer, CTA band, PageHero on inner pages, motion hooks, polish cards.

**Phase 2:** Real screenshots, customer logos, video modal, pricing toggle monthly/yearly, form API.

**Phase 3:** Dedicated payroll/security landing pages, A/B hero copy, analytics.
