import { PageHero } from '../components/marketing/PageHero'
import { CtaBand } from '../components/marketing/CtaBand'
import { SEO } from '../components/seo/SEO'
import { PricingSection } from '../components/sections/PricingSection'

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing"
        description="HR Shastri pricing plans for Starter, Business, and Enterprise teams. Scale users and employees as your company grows."
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
