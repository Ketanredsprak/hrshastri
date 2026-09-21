import { lazy, Suspense } from 'react'
import { SEO, organizationSchema, softwareApplicationSchema } from '../components/seo/SEO'
import { HeroSection } from '../components/sections/HeroSection'
import { HrmExplainerSection } from '../components/sections/HrmExplainerSection'
import { InteractiveFeaturesSection } from '../components/sections/InteractiveFeaturesSection'
import { TrustedSection } from '../components/sections/TrustedSection'

const ProductShowcaseSection = lazy(() =>
  import('../components/sections/ProductShowcaseSection').then((m) => ({
    default: m.ProductShowcaseSection,
  })),
)
const ModulesAlternatingSection = lazy(() =>
  import('../components/sections/ModulesAlternatingSection').then((m) => ({
    default: m.ModulesAlternatingSection,
  })),
)
const WhyChooseSection = lazy(() =>
  import('../components/sections/WhyChooseSection').then((m) => ({ default: m.WhyChooseSection })),
)
const MobileAppSection = lazy(() =>
  import('../components/sections/MobileAppSection').then((m) => ({ default: m.MobileAppSection })),
)
const TestimonialsSection = lazy(() =>
  import('../components/sections/TestimonialsSection').then((m) => ({
    default: m.TestimonialsSection,
  })),
)
const StatsSection = lazy(() =>
  import('../components/sections/StatsSection').then((m) => ({ default: m.StatsSection })),
)
const FaqSection = lazy(() =>
  import('../components/sections/FaqSection').then((m) => ({ default: m.FaqSection })),
)
const PricingSection = lazy(() =>
  import('../components/sections/PricingSection').then((m) => ({ default: m.PricingSection })),
)
const ProcessSection = lazy(() =>
  import('../components/sections/ProcessSection').then((m) => ({ default: m.ProcessSection })),
)
const CtaBand = lazy(() =>
  import('../components/marketing/CtaBand').then((m) => ({ default: m.CtaBand })),
)
const ContactSection = lazy(() =>
  import('../components/sections/ContactSection').then((m) => ({ default: m.ContactSection })),
)

export default function HomePage() {
  return (
    <>
      <SEO jsonLd={[organizationSchema, softwareApplicationSchema]} path="/" />
      <HeroSection />
      <TrustedSection />
      <HrmExplainerSection />
      <InteractiveFeaturesSection />
      <Suspense fallback={null}>
        <ProductShowcaseSection />
      </Suspense>
      <Suspense fallback={null}>
        <ModulesAlternatingSection limit={3} />
      </Suspense>
      <Suspense fallback={null}>
        <WhyChooseSection />
      </Suspense>
      <Suspense fallback={null}>
        <MobileAppSection />
      </Suspense>
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={null}>
        <FaqSection limit={6} layout="split" />
      </Suspense>
      <Suspense fallback={null}>
        <PricingSection compact />
      </Suspense>
      <Suspense fallback={null}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={null}>
        <CtaBand />
      </Suspense>
      <Suspense fallback={null}>
        <ContactSection showHeading={false} />
      </Suspense>
    </>
  )
}
