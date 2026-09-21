import { SITE } from '../lib/constants'

export type PageSeoConfig = {
  path: string
  /** Document title without brand suffix (SEO component appends brand when needed) */
  title: string
  /** Full title override (optional) */
  titleAbsolute?: string
  description: string
  ogImage?: string
  robots?: string
  type?: 'website' | 'article'
  breadcrumbs?: { name: string; path: string }[]
}

const OG_DEFAULT = `${SITE.url}/images/og-default.png`

export const DEFAULT_OG_IMAGE = OG_DEFAULT

/** Central SEO metadata — unique per indexable route */
export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    path: '/',
    title: 'HRMS Software for Indian Businesses',
    titleAbsolute: 'HRMS Software for Indian Businesses | HR Shastri',
    description:
      'HR Shastri is cloud HRMS software for Indian businesses — employee records, attendance, leave, Indian payroll, recruitment, and mobile self-service in one secure platform.',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  features: {
    path: '/features',
    title: 'HRMS Features — Attendance, Leave, Payroll & More',
    description:
      'Explore HR Shastri HRMS features: employee management, attendance and leave, India-ready payroll, recruitment, performance, claims, timesheets, and employee self-service.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Features', path: '/features' },
    ],
  },
  modules: {
    path: '/modules',
    title: 'HRMS Modules — Hire to Retire Workflows',
    description:
      'Browse HR Shastri modules: employee database, attendance, leave, payroll, recruitment, performance, expense claims, reports, and the HR Shastri mobile app.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Modules', path: '/modules' },
    ],
  },
  pricing: {
    path: '/pricing',
    title: 'HRMS Pricing Plans — Starter, Business, Enterprise',
    description:
      'Compare HR Shastri pricing for Starter, Business, and Enterprise. Transparent plans that scale with admin users and employee headcount.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
  },
  faq: {
    path: '/faq',
    title: 'HRMS FAQ — Payroll, Mobile App, Security & Setup',
    description:
      'Answers about HR Shastri HRMS: what an HRM system is, Indian payroll compliance, mobile apps, security, multi-company support, and implementation timelines.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  about: {
    path: '/about',
    title: 'About HR Shastri — Cloud HRMS from Vadodara',
    description:
      'Learn about HR Shastri: an HRMS team building cloud workforce software for Indian businesses — values, experience, and product focus.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  contact: {
    path: '/contact',
    title: 'Contact HR Shastri — Demo, Trial & Support',
    description:
      'Contact HR Shastri to book a demo, start a free trial, or ask about implementation. Vadodara office · +91 915 707 5570 · info@hrshastri.com.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description:
      'Privacy Policy for HR Shastri (hrshastri.com): how we collect, use, and protect information on our website.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
  },
  terms: {
    path: '/terms-of-use',
    title: 'Terms of Use',
    description:
      'Terms of Use for the HR Shastri website and marketing materials. Read conditions for using hrshastri.com.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Use', path: '/terms-of-use' },
    ],
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found',
    description: 'The page you requested could not be found on HR Shastri.',
    robots: 'noindex, follow',
  },
}
