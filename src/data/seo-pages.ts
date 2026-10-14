import { SITE } from '../lib/constants'

export type PageSeoConfig = {
  path: string
  /** Document title without brand suffix (SEO component appends brand when needed) */
  title: string
  /** Full title override (optional) */
  titleAbsolute?: string
  description: string
  keywords?: string
  ogImage?: string
  robots?: string
  type?: 'website' | 'article'
  breadcrumbs?: { name: string; path: string }[]
}

const OG_DEFAULT = `${SITE.url}/images/og-default.png`

export const DEFAULT_OG_IMAGE = OG_DEFAULT

/** Central SEO metadata — tailored for commercial buyer search intent across India & global markets */
export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    path: '/',
    title: 'HRMS Software for Indian Businesses — Complete Employee Management System',
    titleAbsolute: 'HRMS Software for Indian Businesses — Complete Employee Management System | HR Shastri',
    description:
      'HR Shastri is cloud HRMS software for Indian businesses to manage employees — attendance tracking, leave approvals, India-ready payroll (PF, ESI, TDS), recruitment, and mobile self-service. Book a free demo.',
    keywords:
      'HRMS software, employee management system, HR software India, payroll software India, attendance management system, leave management software, biometric attendance HRMS, workforce management system, employee self service app, buy HRMS software',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  features: {
    path: '/features',
    title: 'HRMS Software Features — Attendance, Leave, Payroll & Self-Service',
    titleAbsolute: 'HRMS Software Features — Attendance, Leave, Payroll & Self-Service | HR Shastri',
    description:
      'Explore HR Shastri HRMS features: centralized employee database, biometric & geofence attendance, leave workflows, statutory Indian payroll, recruitment ATS, performance, and mobile self-service.',
    keywords:
      'HRMS features, attendance management software, leave tracking software, Indian payroll software, HR self service portal, HR software features, employee database system, geofencing attendance',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Features', path: '/features' },
    ],
  },
  modules: {
    path: '/modules',
    title: 'HRMS Modules — Complete Hire-to-Retire Workforce Management',
    titleAbsolute: 'HRMS Modules — Complete Hire-to-Retire Workforce Management | HR Shastri',
    description:
      'Browse HR Shastri modules: employee records, biometric attendance, automated leave, PF/ESI payroll, recruitment ATS, performance appraisals, expense claims, and Android/iOS mobile app.',
    keywords:
      'HRMS modules, workforce management modules, HR payroll module, attendance module, leave management module, employee database system, recruitment software module',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Modules', path: '/modules' },
    ],
  },
  pricing: {
    path: '/pricing',
    title: 'HRMS Software Pricing & Plans — Affordable for Indian SMEs & Enterprises',
    titleAbsolute: 'HRMS Software Pricing & Plans — Affordable for Indian SMEs & Enterprises | HR Shastri',
    description:
      'Compare HR Shastri HRMS pricing plans: Starter, Business, and Enterprise. Transparent pricing tailored for Indian companies with free setup and dedicated implementation support.',
    keywords:
      'HRMS software price, HR software cost India, HRMS pricing plans, affordable HRMS India, employee management software price, payroll software pricing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
  },
  faq: {
    path: '/faq',
    title: 'HRMS Software FAQ — Payroll, Biometric, Mobile App & Setup',
    titleAbsolute: 'HRMS Software FAQ — Payroll, Biometric, Mobile App & Setup | HR Shastri',
    description:
      'Frequently asked questions about HR Shastri HRMS software: Indian statutory payroll compliance, biometric & mobile attendance, implementation timeline, data security, and multi-branch support.',
    keywords:
      'HRMS FAQ, HR software questions, payroll software FAQ, HRMS implementation India, biometric attendance questions, cloud HRMS security',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  about: {
    path: '/about',
    title: 'About HR Shastri — Cloud HRMS Software Company in Vadodara, India',
    titleAbsolute: 'About HR Shastri — Cloud HRMS Software Company in Vadodara, India | HR Shastri',
    description:
      'Learn about HR Shastri: 30+ HR experts with over a decade of domain experience building cloud HRMS software for 50+ companies across India from Vadodara, Gujarat.',
    keywords:
      'about HR Shastri, HRMS software company India, HR software provider Vadodara Gujarat, HR tech company India, workforce software creators',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  contact: {
    path: '/contact',
    title: 'Contact HR Shastri — Book a Live Demo & Free HRMS Trial',
    titleAbsolute: 'Contact HR Shastri — Book a Live Demo & Free HRMS Trial | HR Shastri',
    description:
      'Contact HR Shastri to schedule a live product demo or start a free 14-day trial. Reach our Vadodara headquarters at +91 915 707 5570 or info@hrshastri.com.',
    keywords:
      'contact HR Shastri, book HRMS demo, HR software free trial, HRMS sales enquiry, HR Shastri Vadodara office, hire HRMS software',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy — HR Shastri HRMS Platform',
    titleAbsolute: 'Privacy Policy — HR Shastri HRMS Platform',
    description:
      'Privacy Policy for HR Shastri (hrshastri.com): how we collect, store, process, and protect your company and employee information.',
    keywords: 'HR Shastri privacy policy, HRMS data protection, employee data privacy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
  },
  terms: {
    path: '/terms-of-use',
    title: 'Terms of Use — HR Shastri HRMS Platform',
    titleAbsolute: 'Terms of Use — HR Shastri HRMS Platform',
    description:
      'Terms of Use and conditions for using the HR Shastri website, services, and software platform.',
    keywords: 'HR Shastri terms of use, HRMS service agreement, terms and conditions',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Use', path: '/terms-of-use' },
    ],
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found (404)',
    titleAbsolute: 'Page Not Found (404) | HR Shastri',
    description: 'The page you requested could not be found on HR Shastri HRMS platform.',
    robots: 'noindex, follow',
  },
}

