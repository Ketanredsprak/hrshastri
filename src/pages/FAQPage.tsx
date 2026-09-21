import { FAQ_ITEMS } from '../data/faq'
import { PageHero } from '../components/marketing/PageHero'
import { SEO, faqSchema } from '../components/seo/SEO'
import { FaqSection } from '../components/sections/FaqSection'

export default function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about HR Shastri HRMS — payroll, mobile app, security, multi-company support, implementation, and compliance."
        path="/faq"
        jsonLd={faqSchema(FAQ_ITEMS)}
      />
      <PageHero
        eyebrow="FAQ"
        title="Answers for HR, finance, and leadership"
        description="What is an HRM system? Software that automates employee data, payroll, recruitment, performance, training, and reporting."
      />
      <FaqSection />
    </>
  )
}
