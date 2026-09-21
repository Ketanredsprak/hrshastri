import { Helmet } from 'react-helmet-async'
import { SITE } from '../../lib/constants'

type SEOProps = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SEO({
  title,
  description = 'HR Shastri is a cloud HRMS for Indian businesses: employee management, attendance, leave, payroll, statutory reports, recruitment, and mobile self-service.',
  path = '',
  type = 'website',
  jsonLd,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — Complete HRMS Platform`
  const url = `${SITE.url}${path}`
  const image = `${SITE.url}/logo.png`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address,
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390007',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/people/HRshastri/61551775772202/',
    'https://x.com/HrShastrii',
    'https://www.instagram.com/hrshastrii/',
  ],
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    description: 'Free trial available',
  },
  description:
    'Cloud HRMS for Indian businesses with employee management, attendance, leave, payroll, recruitment, and mobile self-service.',
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
