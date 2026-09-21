# HR Shastri Marketing Site — Sitemap

| Route | Page | Primary sections |
|-------|------|------------------|
| `/` | Home | Hero, trusted logos, features, modules, why us, screenshots, process, testimonials, stats, FAQ preview, pricing preview, mobile app, contact |
| `/features` | Features | Feature grid, core services, how-it-works deep dives |
| `/modules` | Modules | Alternating module storytelling with anchors |
| `/pricing` | Pricing | Starter, Business, Enterprise plans |
| `/faq` | FAQ | Full accordion + FAQ schema |
| `/about` | About | Company story, who we are, values |
| `/contact` | Contact | Form, office details, map, social links |

## External

- Login → production app (`SITE.loginUrl` in `src/lib/constants.ts`)

## SEO assets

- `public/robots.txt`
- `public/sitemap.xml`
- Per-page meta via `src/components/seo/SEO.tsx`
