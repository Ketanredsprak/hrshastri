# HR Shastri Marketing Website

Modern multi-page React marketing site for the HR Shastri cloud HRMS.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- react-helmet-async (SEO)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```
src/
  app/           # Router configuration
  components/
    layout/      # Header, footer, shell
    sections/    # Homepage & reusable marketing sections
    seo/         # Meta tags + JSON-LD
    ui/          # Buttons, container, accordion
    visuals/     # Product mockups
  data/          # Content models (features, FAQ, pricing)
  lib/           # Site constants
  pages/         # Route-level pages
docs/            # Sitemap, wireframe, product reference
public/          # logo, robots.txt, sitemap.xml
```

## Brand colors

- Purple `#51459D`
- Magenta `#B83F81`
- Blue `#1A56DB`

## Deployment

Build static assets with `npm run build` and serve the `dist/` folder (Apache/Nginx/CDN). Update canonical URLs in `src/lib/constants.ts` and `public/sitemap.xml` for your production domain.