import { Helmet } from 'react-helmet-async'
import { SITE } from '../../lib/constants'
import {
  type BreadcrumbItem,
  breadcrumbSchema,
  webSiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
} from './seo-schemas'

export type { BreadcrumbItem }
export { webSiteSchema, organizationSchema, softwareApplicationSchema, faqSchema, breadcrumbSchema }

type SEOProps = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  keywords?: string
  robots?: string
  image?: string
  breadcrumbs?: BreadcrumbItem[]
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const DEFAULT_IMAGE = `${SITE.url}/images/og-default.png`
const DEFAULT_DESCRIPTION =
  'HR Shastri is cloud HRMS software for Indian businesses to manage employees — attendance tracking, leave approvals, India-ready payroll (PF, ESI, TDS), recruitment, and mobile self-service. Book a free demo.'
const DEFAULT_KEYWORDS =
  'HRMS software, employee management system, HR software India, payroll software India, attendance management system, leave management software, biometric attendance HRMS, workforce management system, employee self service app'

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  type = 'website',
  keywords = DEFAULT_KEYWORDS,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image = DEFAULT_IMAGE,
  breadcrumbs,
  jsonLd,
}: SEOProps) {
  let pageTitle = `${SITE.name} — Complete HRMS Platform for Modern Companies`
  if (title) {
    pageTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
  }

  const canonicalUrl = `${SITE.url}${path}`

  const schemas: Record<string, unknown>[] = []
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      schemas.push(...jsonLd)
    } else {
      schemas.push(jsonLd)
    }
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(breadcrumbs))
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE.name} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE.name} HRMS Software Platform`} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@HrShastrii" />
      <meta name="twitter:creator" content="@HrShastrii" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${SITE.name} HRMS Platform`} />

      {/* Local & Geo Targeting for Indian Businesses */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Vadodara, Gujarat, India" />
      <meta name="geo.position" content="22.3072;73.1812" />
      <meta name="ICBM" content="22.3072, 73.1812" />

      {schemas.length > 0 ? (
        <script type="application/ld+json">
          {JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)}
        </script>
      ) : null}
    </Helmet>
  )
}
