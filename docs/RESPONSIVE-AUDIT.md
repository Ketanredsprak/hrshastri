# HR Shastri — Responsive Audit & Fix Report

**Date:** 2026-09-21  
**Scope:** Full marketing site

## Critical blockers restored

Corrupted project files were restored so the app can build/run:

- `package.json`
- `vite.config.ts`
- `index.html` (viewport + `#root`)
- `src/main.tsx` (`createRoot` + `index.css`)
- `src/index.css` (broken utility braces)

Also wired `/terms-of-use` and fixed `TermsOfUsePage` SEO props.

## Problems found → fixed

| Area | Problem | Fix |
|------|---------|-----|
| Global CSS | Broken utilities / no overflow safety | Restored utilities; `overflow-x: clip`; img max-width |
| Typography | Display type too large on 320px | Fluid `clamp()` mins lowered |
| Section spacing | Abrupt padding jumps | `py-12 sm:py-16 md:py-20 lg:py-24` |
| Header | Weak mobile menu | Overlay, body scroll lock, Escape, route close, touch targets |
| Hero | Tall mock + dense trust row | Shorter mobile dashboard; 2-col trust grid; full-width CTAs |
| Features interactive | Long vertical tabs on mobile | Horizontal chip scroller &lt; lg |
| Testimonials / FAQ | Tight padding / wrapping | Responsive type + min 44px controls |
| Footer | 6 groups in 5 cols | 2→3→6 col progression; break-words |
| Store badges | Fixed 168px | Fluid max-width on small screens |
| PageHero | Desktop-only CTA wrap | Stack CTAs on mobile |
| Modules hero | CTA wrap | Full-width mobile buttons |

## Breakpoints used

`base` → `sm (640)` → `md (768)` → `lg (1024)` → `xl (1280)`  
Content capped with `max-w-7xl`.

## Components / pages touched

Header, Footer, Container, SectionHeading, Accordion, PageHero, CtaBand, TrustBar, HeroSection, HeroDashboard, InteractiveFeaturesSection, ModulesAlternatingSection, MobileAppSection, ModulesHero, TestimonialsSection, PricingSection, TermsOfUsePage, routes, index.css, package.json, vite.config, index.html, main.tsx.

## QA sample

- **320 / 375:** no horizontal overflow; hamburger; full-width primary CTAs  
- **768:** hamburger retained; no overflow  
- **1024+:** desktop nav visible  
- **`npm run build`:** passes  

## Remaining / follow-ups

- Tablet could optionally show a condensed mid-nav between md–lg (currently hamburger until lg)
- Landscape phone: acceptable; further density polish optional
- Custom cursor still desktop-only (`pointer: fine`) — intentional
- Prefer real device Safari pass in final staging
