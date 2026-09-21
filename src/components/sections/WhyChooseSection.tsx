import { Shield, Zap, Cloud, Smartphone, Building2, UserCog, Headphones } from 'lucide-react'
import { WHY_CHOOSE_US } from '../../data/features'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'

const icons = [Zap, Shield, Cloud, Smartphone, Building2, UserCog, Headphones]

export function WhyChooseSection() {
  return (
    <section className="section-padding bg-surface-1">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Outcomes"
            title="Why teams choose HR Shastri"
            description="Secure, scalable, and tailored for Indian businesses with multi-branch teams and statutory payroll requirements."
          />
          <p className="text-lead text-muted lg:pb-2">
            Reduce manual HR work, improve compliance visibility, and give employees a modern
            self-service experience — without enterprise implementation complexity.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = icons[index] ?? Zap
            return (
              <Card key={item.title} hover className="!p-5">
                <div className="inline-flex rounded-xl bg-brand-blue-light p-2.5 text-brand-blue">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-bold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
