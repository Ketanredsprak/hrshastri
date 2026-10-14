import { PageHero } from '../components/marketing/PageHero'
import { SEO } from '../components/seo/SEO'
import { PAGE_SEO } from '../data/seo-pages'
import { ContactSection } from '../components/sections/ContactSection'

export default function ContactPage() {
  return (
    <>
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        breadcrumbs={PAGE_SEO.contact.breadcrumbs}
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Let's get connected"
        description="Book a demo, start a free trial, or ask our HR experts about implementation and modules."
      />
      <ContactSection showHeading={false} />
    </>
  )
}
