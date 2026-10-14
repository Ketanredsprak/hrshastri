import { FAQ_ITEMS } from '../data/faq'
import { PageHero } from '../components/marketing/PageHero'
import { SEO, faqSchema } from '../components/seo/SEO'
import { PAGE_SEO } from '../data/seo-pages'
import { FaqSection } from '../components/sections/FaqSection'

export default function FAQPage() {
  return (
    <>
      <SEO
        title={PAGE_SEO.faq.title}
        description={PAGE_SEO.faq.description}
        keywords={PAGE_SEO.faq.keywords}
        breadcrumbs={PAGE_SEO.faq.breadcrumbs}
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
