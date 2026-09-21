import { Container } from '../ui/Container'
import { RevealGroup, RevealItem } from '../ui/MotionReveal'
import { RingField } from '../ui/SectionMotif'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

export function HrmExplainerSection() {
  return (
    <section className="section-padding bg-surface">
      <Container>
        <RevealGroup className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-card lg:grid-cols-2 lg:p-12">
          <RingField className="pointer-events-none absolute -right-6 -top-8 h-56 w-56 text-brand-blue/15" />
          <RevealItem className="relative z-10">
            <SectionHeading
              align="left"
              eyebrow="About ourselves"
              title="What is an HRMS system?"
              description="A Human Resource Management system is software that automates and streamlines HR processes — employee data, payroll, recruitment, performance, training, and reporting — to improve efficiency and accuracy."
            />
            <p className="text-sm leading-relaxed text-muted md:text-base">
              HR Shastri replaces spreadsheets and scattered tools with one secure, role-based
              platform. SMEs, HR teams, payroll administrators, line managers, and employees all
              work from the same source of truth — on web and mobile.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/about">About HR Shastri</Button>
              <Button to="/faq" variant="outline">
                Read FAQs
              </Button>
            </div>
          </RevealItem>
          <RevealItem className="relative z-10">
          <ul className="space-y-4 text-sm text-slate-700 md:text-base">
            {[
              'Single employee record linked to attendance, leave, salary, and exit',
              'India-ready payroll with statutory deductions and compliance reports',
              'Granular roles — Super Admin, Company, HR, custom staff, and Employee',
              'WFH, short leave, gate pass, visits, claims, and geofencing attendance',
              'Recruitment, performance, training, finance, assets, and analytics',
            ].map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-surface px-4 py-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full gradient-brand" />
                {item}
              </li>
            ))}
          </ul>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  )
}
