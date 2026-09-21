import { CtaBand } from '../components/marketing/CtaBand'
import { SEO, organizationSchema, softwareApplicationSchema } from '../components/seo/SEO'
import { ContactSection } from '../components/sections/ContactSection'
import { FaqSection } from '../components/sections/FaqSection'
import { HeroSection } from '../components/sections/HeroSection'
import { HrmExplainerSection } from '../components/sections/HrmExplainerSection'
import { InteractiveFeaturesSection } from '../components/sections/InteractiveFeaturesSection'
import { MobileAppSection } from '../components/sections/MobileAppSection'
import { ModulesAlternatingSection } from '../components/sections/ModulesAlternatingSection'
import { PricingSection } from '../components/sections/PricingSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ProductShowcaseSection } from '../components/sections/ProductShowcaseSection'
import { StatsSection } from '../components/sections/StatsSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { TrustedSection } from '../components/sections/TrustedSection'
import { WhyChooseSection } from '../components/sections/WhyChooseSection'

export default function HomePage() {
  return (
    <>
      <SEO jsonLd={[organizationSchema, softwareApplicationSchema]} path="/" />
      <HeroSection />
      <TrustedSection />
      <HrmExplainerSection />
      <InteractiveFeaturesSection />
      <ProductShowcaseSection />
      <ModulesAlternatingSection limit={3} />
      <WhyChooseSection />
      <MobileAppSection />
      <TestimonialsSection />
      <StatsSection />
      <FaqSection limit={6} layout="split" />
      <PricingSection compact />
      <ProcessSection />
      <CtaBand />
      <ContactSection showHeading={false} />
    </>
  )
}
