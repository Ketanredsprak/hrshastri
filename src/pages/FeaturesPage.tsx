import { CheckCircle2 } from 'lucide-react'
import { CORE_SERVICES } from '../data/features'
import { HOW_IT_WORKS } from '../data/modules'
import { PageHero } from '../components/marketing/PageHero'
import { SEO } from '../components/seo/SEO'
import { FeaturesGridSection } from '../components/sections/FeaturesGridSection'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'

export default function FeaturesPage() {
  return (
    <>
      <SEO
        title="Features"
        description="Explore HR Shastri features: employee management, attendance, leave, Indian payroll, recruitment, performance, claims, timesheets, and mobile HR."
        path="/features"
      />
      <PageHero
        eyebrow="Features"
        title="Our core capabilities"
        description="All-in-one management platform for your human resource — from administrator workflows to employee self-service."
      />
      <FeaturesGridSection showViewAll={false} />
      <section className="section-padding bg-surface-1">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Built for HR administrators and business leaders"
            description="End-to-end customized HR solutions optimized for your organizational structure."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((service) => (
              <Card key={service.title} hover>
                <h3 className="text-lg font-bold text-brand-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Module depth that matches real HR operations"
            description="Payroll, claims, employee management, timesheets, training, recruitment, and reporting — connected in one platform."
          />
          <div className="space-y-5">
            {HOW_IT_WORKS.map((item) => (
              <Card key={item.title} variant="soft" className="!p-6 md:!p-8">
                <h3 className="text-xl font-bold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
