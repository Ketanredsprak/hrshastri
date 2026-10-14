import { Check, Users, UserCheck, Calendar } from 'lucide-react'
import { PRICING_PLANS } from '../../data/pricing'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { MotionReveal, RevealGroup, RevealItem } from '../ui/MotionReveal'
import { CornerSquares } from '../ui/SectionMotif'
import { SectionHeading } from '../ui/SectionHeading'
import { Link } from 'react-router-dom'
import { useContactRedirect } from '../../lib/contact-navigation'

type PricingSectionProps = {
  compact?: boolean
}

export function PricingSection({ compact = false }: PricingSectionProps) {
  const contactRedirect = useContactRedirect()
  return (
    <section className="section-padding bg-white" id="pricing">
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="Subscription Plans"
            title="Choose a plan that scales with your headcount"
            description="Transparent pricing based on your active users and employee capacity with flexible billing options."
          />
        </MotionReveal>
        <RevealGroup className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <RevealItem key={plan.name} className="flex">
              <div
                className={`group relative flex w-full flex-col justify-between rounded-2xl border p-5 shadow-card sm:rounded-3xl sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift cursor-default ${
                  plan.highlighted
                    ? 'border-brand-purple/50 bg-gradient-to-b from-brand-purple/5 to-white ring-2 ring-brand-purple/25 hover:border-brand-purple'
                    : 'border-slate-200/80 bg-white hover:border-brand-purple/35'
                }`}
              >
                {compact ? (
                  <CornerSquares
                    className={plan.highlighted ? 'text-brand-purple/40' : 'text-brand-blue/30'}
                  />
                ) : null}
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Recommended
                  </span>
                ) : null}

                <div>
                  {/* Badge */}
                  <span className="inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-purple border border-indigo-100/80">
                    {plan.badge}
                  </span>

                  {/* Price */}
                  <div className="mt-4">
                    <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                      {plan.price}
                      <span className="text-sm font-semibold text-muted ml-1">{plan.period}</span>
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500 line-clamp-1">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Limits and Capacity Box (matching admin system) */}
                  <div className="mt-5 space-y-2 rounded-xl bg-slate-50/90 p-3 border border-slate-100 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 font-medium text-slate-700">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                        <Users className="h-3.5 w-3.5" aria-hidden />
                      </div>
                      <span className="truncate">{plan.users}</span>
                    </div>

                    <div className="flex items-center gap-2.5 font-medium text-slate-700">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-100 text-teal-600">
                        <UserCheck className="h-3.5 w-3.5" aria-hidden />
                      </div>
                      <span className="truncate">{plan.employees}</span>
                    </div>

                    <div className="flex items-center gap-2.5 font-medium text-slate-700">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                      </div>
                      <span className="truncate">
                        Billing: <strong className="text-brand-ink">{plan.billingCycle}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <ul className="mt-5 space-y-2.5">
                    {plan.features.slice(0, compact ? 4 : undefined).map((feature) => (
                      <li key={feature} className="flex gap-2 text-xs sm:text-sm text-slate-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-purple" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-2">
                  <Button
                    to="/#contact?intent=trial"
                    onClick={(e) => contactRedirect('trial', e)}
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    className="w-full text-xs sm:text-sm"
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
              Compare all subscription details & limits →
            </Link>
          </p>
        ) : null}
      </Container>
    </section>
  )
}
