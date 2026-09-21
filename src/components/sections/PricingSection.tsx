import { Check } from 'lucide-react'
import { PRICING_PLANS } from '../../data/pricing'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { MotionReveal, RevealGroup, RevealItem } from '../ui/MotionReveal'
import { CornerSquares } from '../ui/SectionMotif'
import { SectionHeading } from '../ui/SectionHeading'
import { Link } from 'react-router-dom'

type PricingSectionProps = {
  compact?: boolean
}

export function PricingSection({ compact = false }: PricingSectionProps) {
  return (
    <section className="section-padding bg-white" id="pricing">
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Choose a plan that scales with your headcount"
            description="Upgrade when you grow — flexible user and employee limits with transparent modules."
          />
        </MotionReveal>
        <RevealGroup className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <RevealItem key={plan.name}>
            <div
              className={`relative h-full rounded-2xl border p-5 shadow-card sm:rounded-3xl sm:p-6 md:p-8 ${
                plan.highlighted
                  ? 'border-brand-purple/40 bg-gradient-to-b from-brand-purple/5 to-white ring-2 ring-brand-purple/20'
                  : 'border-slate-100 bg-white'
              }`}
            >
              {compact ? <CornerSquares className={plan.highlighted ? 'text-brand-purple/40' : 'text-brand-blue/30'} /> : null}
              {plan.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              ) : null}
              <h3 className="text-xl font-bold text-brand-navy">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>
              <p className="mt-5 text-4xl font-extrabold text-brand-navy">
                {plan.price}
                <span className="text-base font-medium text-muted">{plan.period}</span>
              </p>
              <p className="mt-3 text-sm font-medium text-brand-purple">{plan.users}</p>
              <p className="text-sm font-medium text-brand-purple">{plan.employees}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.slice(0, compact ? 4 : undefined).map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  to={`/contact?intent=${plan.name === 'Enterprise' ? 'sales' : 'trial'}`}
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
            </RevealItem>
          ))}
        </RevealGroup>
        {compact ? (
          <p className="mt-8 text-center text-sm">
            <Link to="/pricing" className="font-semibold text-brand-purple hover:text-brand-magenta">
              Compare full pricing →
            </Link>
          </p>
        ) : null}
      </Container>
    </section>
  )
}
