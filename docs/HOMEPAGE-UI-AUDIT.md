# Homepage UI Audit (Pre-rebuild)

## Critical issues fixed in this pass

| ID | Area | Problem | Fix |
|----|------|---------|-----|
| C1 | Buttons | `className` overrides could break contrast on CTA band | `outlineOnDark` variant; no light-on-light |
| C2 | Hero | Generic split layout, weak hierarchy | Premium mesh/grid bg, browser frame, staged motion |
| C3 | Features | 13 identical cards — template feel | Interactive feature navigator + live preview |
| C4 | FAQ | Centered accordion only | Home: split heading + accordion |
| C5 | Contact | Form-first; missing company/headcount | Left info column, expanded form + validation UI |
| C6 | Journey | Sections feel disconnected | Reordered scroll narrative per SaaS funnel |
| C7 | Product proof | Small mockup only | Dedicated full-width product showcase |
| C8 | Testimonials | Small static cards | Large quote carousel |
| C9 | Mobile menu | Instant show/hide | Animated drawer with focus trap pattern |
| C10 | Footer | Dense but flat | Structured columns + readable contrast |

## Remaining (content/assets — not code)

- Replace text logo placeholders with real client logos
- Replace UI mock labels with real product screenshots when available
- Wire contact form to backend API

## Verified metrics (used on site)

500+ companies · 50,000+ employees · 99.9% uptime · 10+ modules · 30+ HR experts · 50+ clients
