import { FAQ_ITEMS } from '../../data/faq'
import { Container } from '../ui/Container'
import { Accordion } from '../ui/Accordion'
import { Badge } from '../ui/Badge'
import { MotionReveal } from '../ui/MotionReveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Link } from 'react-router-dom'

type FaqSectionProps = {
  limit?: number
  layout?: 'center' | 'split'
}

export function FaqSection({ limit, layout = 'center' }: FaqSectionProps) {
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS

  if (layout === 'split') {
    return (
      <section className="section-padding bg-white" id="faq">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <MotionReveal className="lg:col-span-4 lg:pt-2">
              <Badge variant="blue">FAQ</Badge>
              <h2 className="mt-4 text-section font-bold text-brand-ink">
                Answers for HR, finance, and leadership
              </h2>
              <p className="mt-4 text-lead text-muted">
                What is an HRM system? Software that automates employee data, payroll, recruitment,
                performance, training, and reporting for accuracy and efficiency.
              </p>
              {limit ? (
                <Link
                  to="/faq"
                  className="mt-6 inline-flex text-sm font-semibold text-brand-blue hover:text-brand-purple"
                >
                  View all FAQs →
                </Link>
              ) : null}
            </MotionReveal>
            <MotionReveal className="lg:col-span-8" delay={0.08}>
              <Accordion items={items} />
            </MotionReveal>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="section-padding bg-surface-1" id="faq">
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers for HR, finance, and leadership"
            description="What is HRM? HR Shastri automates employee data, payroll, recruitment, performance, training, and reporting for accuracy and efficiency."
          />
        </MotionReveal>
        <MotionReveal className="mx-auto max-w-3xl" delay={0.08}>
          <Accordion items={items} />
          {limit ? (
            <p className="mt-6 text-center text-sm">
              <Link to="/faq" className="font-semibold text-brand-blue hover:text-brand-purple">
                View all FAQs →
              </Link>
            </p>
          ) : null}
        </MotionReveal>
      </Container>
    </section>
  )
}
