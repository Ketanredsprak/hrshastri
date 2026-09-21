import { Link } from 'react-router-dom'
import { PageHero } from '../components/marketing/PageHero'
import { SEO } from '../components/seo/SEO'
import { Container } from '../components/ui/Container'
import { MotionReveal } from '../components/ui/MotionReveal'
import { SITE } from '../lib/constants'

export default function TermsOfUsePage() {
  return (
    <>
      <SEO
        title="Terms of Use"
        description={`Conditions for using the ${SITE.name} marketing website at ${SITE.url}.`}
        path="/terms-of-use"
      />
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description={`Conditions for using the ${SITE.name} marketing website at ${SITE.url}.`}
      />
      <section className="section-padding bg-white">
        <Container>
          <MotionReveal>
          <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted md:text-base">
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Acceptance of terms</h2>
              <p className="mt-3">
                By accessing {SITE.url}, you agree to these Terms of Use. If you do not agree, please
                do not use this website. Product login and subscription agreements for the HR Shastri
                application may include additional terms provided at signup or contract.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Website purpose</h2>
              <p className="mt-3">
                This site provides information about HR Shastri HRMS software, pricing inquiries,
                demos, and company contact details. Content is for general information and may change
                without notice.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Accuracy of information</h2>
              <p className="mt-3">
                We aim to keep product descriptions accurate. Features, plans, and pricing shown on
                marketing pages may be updated. Confirm current details with our team before purchase.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Intellectual property</h2>
              <p className="mt-3">
                Logos, product names, screenshots, copy, and design on this website are owned by{' '}
                {SITE.name} / related rights holders. You may not copy or redistribute them without
                permission, except for fair personal reference use.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Acceptable use</h2>
              <p className="mt-3">
                You agree not to misuse the site (including attempting unauthorized access, scraping
                in ways that harm service availability, or submitting abusive content via forms).
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Third-party links</h2>
              <p className="mt-3">
                Links to Google Play, the App Store, social profiles, or maps are provided for
                convenience. We are not responsible for third-party sites or their policies.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Limitation of liability</h2>
              <p className="mt-3">
                To the extent permitted by law, {SITE.name} is not liable for indirect or
                consequential damages arising from use of this marketing website. Product warranties,
                if any, are governed by your customer agreement.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Privacy</h2>
              <p className="mt-3">
                Personal data submitted through this site is handled as described in our{' '}
                <Link to="/privacy-policy" className="font-medium text-brand-blue hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-ink">Contact</h2>
              <p className="mt-3">
                Questions about these terms:{' '}
                <a href={`mailto:${SITE.email}`} className="font-medium text-brand-blue hover:underline">
                  {SITE.email}
                </a>{' '}
                · {SITE.phone} · {SITE.address}
              </p>
            </section>
          </article>
          </MotionReveal>
        </Container>
      </section>
    </>
  )
}
