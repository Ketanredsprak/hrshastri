import { Link } from 'react-router-dom'
import { MAIN_FEATURES } from '../../data/features'
import { Container } from '../ui/Container'
import { RevealGroup, RevealItem } from '../ui/MotionReveal'
import { DiamondRule, LeafCorner } from '../ui/SectionMotif'
import { SectionHeading } from '../ui/SectionHeading'

const FEATURE_KEYS = [
  'Employee Management',
  'Attendance',
  'Leave Management',
  'Payroll',
  'Performance Management',
  'Recruitment',
  'Expense Management',
  'Document Management',
] as const

const features = MAIN_FEATURES.filter((f) =>
  FEATURE_KEYS.includes(f.title as (typeof FEATURE_KEYS)[number]),
)

export function InteractiveFeaturesSection() {
  return (
    <section className="section-padding bg-surface-1" id="features">
      <Container>
        <SectionHeading
          eyebrow="HRMS features"
          title="Explore the platform by capability"
          description="One system for daily operations — the capabilities your HR team uses every day."
        />
        <div className="-mt-6 mb-8 sm:-mt-8">
          <DiamondRule />
        </div>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <RevealItem key={feature.title} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue/20 hover:shadow-soft sm:p-6">
                  <LeafCorner className="pointer-events-none absolute -right-0.5 -top-0.5 h-[4.25rem] w-[4.25rem] text-brand-purple" />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-brand-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>
        <p className="mt-8 text-center">
          <Link
            to="/features"
            className="inline-flex text-sm font-semibold text-brand-blue hover:text-brand-purple"
          >
            View all 13+ modules →
          </Link>
        </p>
      </Container>
    </section>
  )
}
