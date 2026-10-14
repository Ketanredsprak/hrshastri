import { SITE, SOCIAL } from '../../lib/constants'

export type BreadcrumbItem = {
  name: string
  path: string
}

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  alternateName: ['HRShastri', 'HR Shastri HRMS', 'HRShastri Software'],
  url: SITE.url,
  description:
    'Complete Human Resource Management System (HRMS) for Indian businesses to manage employees, attendance, leave, payroll, and recruitment.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/features?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/images/og-default.png`,
  email: SITE.email,
  telephone: SITE.phone,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'gu'],
    },
    {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'gu'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address,
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390007',
    addressCountry: 'IN',
  },
  sameAs: [SOCIAL.facebook, SOCIAL.twitter, SOCIAL.instagram],
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  alternateName: 'HR Shastri HRMS Software',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Human Resources Management Software',
  operatingSystem: 'Web Browser, Android, iOS',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '150',
    offerCount: '4',
    priceValidUntil: '2026-12-31',
    offers: [
      {
        '@type': 'Offer',
        name: 'Unlimited Plan with Monthly Invoice',
        price: '150',
        priceCurrency: 'INR',
        description: 'Unlimited users and employee capacity with monthly invoicing. ₹150 per user.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Points Plan',
        price: '6000',
        priceCurrency: 'INR',
        description: '10 users and 50 employees capacity. ₹6,000 per month.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Yearly Plan',
        price: '10000',
        priceCurrency: 'INR',
        description: '5 users and 5 employees capacity. ₹10,000 per year.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Monthly Plan',
        price: '12000',
        priceCurrency: 'INR',
        description: '20 users and 100 employees capacity. ₹12,000 per month.',
        availability: 'https://schema.org/InStock',
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '52',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'Centralized Employee Records & Document Management',
    'Geofencing & Biometric Attendance Sync',
    'Automated Leave Request & Multi-Level Approvals',
    'India Statutory Payroll with PF, ESI, TDS, PT',
    'Applicant Tracking & Recruitment Pipeline',
    'Performance Appraisal & KPI Reviews',
    'Employee Self-Service (ESS) Mobile App for iOS and Android',
    'Expense Claims & Reimbursement Workflows',
    'Shift Rostering & Timesheet Tracking',
  ],
  screenshot: [
    `${SITE.url}/images/hero-dashboard.png`,
    `${SITE.url}/images/product-showcase-dashboard.png`,
    `${SITE.url}/images/hr-shastri-employee-database.png`,
    `${SITE.url}/images/hr-shastri-attendance-tracking.png`,
    `${SITE.url}/images/hr-shastri-leave-management.png`,
  ],
  description:
    'Comprehensive cloud HRMS software designed for Indian businesses to manage employees, attendance, leave, statutory payroll, recruitment, and mobile self-service.',
  url: SITE.url,
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE.url}${crumb.path}`,
    })),
  }
}
