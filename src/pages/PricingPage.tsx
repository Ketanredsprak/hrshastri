import { PageHero } from '../components/marketing/PageHero'
import { CtaBand } from '../components/marketing/CtaBand'
import { SEO } from '../components/seo/SEO'
import { PAGE_SEO } from '../data/seo-pages'
import { PricingSection } from '../components/sections/PricingSection'

export default function PricingPage() {
  return (
    <>
      <SEO
        title={PAGE_SEO.pricing.title}
        description={PAGE_SEO.pricing.description}
        keywords={PAGE_SEO.pricing.keywords}
        breadcrumbs={PAGE_SEO.pricing.breadcrumbs}
        path="/pricing"
      />
      <PageHero
        eyebrow="Pricing"
        title="Plans that scale with your headcount"
        description="Transparent modules, secure cloud hosting, and implementation support — upgrade when your team grows."
      />
      <PricingSection />
      <CtaBand title="Not sure which plan fits?" description="Our team will map modules to your branches, payroll structure, and employee count." />
    </>
  )
}
