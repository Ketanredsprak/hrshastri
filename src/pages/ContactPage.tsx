import { PageHero } from '../components/marketing/PageHero'
import { SEO } from '../components/seo/SEO'
import { ContactSection } from '../components/sections/ContactSection'

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact HR Shastri for demos, free trials, and support. Vadodara office, phone +91 915 707 5570, info@hrshastri.com."
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
